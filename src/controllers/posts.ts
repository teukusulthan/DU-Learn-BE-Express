import { Request, Response } from "express";
import { prisma } from "../connection/client";

// GET posts (filter category)
export const getPosts = async (req: Request, res: Response) => {
  try {
    const { category } = req.query as Record<string, string | undefined>;

    const where = category ? { category: { slug: category } } : undefined;

    const posts = await prisma.post.findMany({ where });
    return res.status(200).json(posts);
  } catch {
    return res.status(500).json({ error: "Failed to get posts" });
  }
};

//GET /post/:id
export const getPostComments = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id))
      return res.status(400).json({ error: "Invalid post id" });

    const { page = "1", perPage = "10" } = req.query as Record<
      string,
      string | undefined
    >;

    let pageNum = Number(page) || 1;
    if (pageNum < 1) pageNum = 1;

    let per = Number(perPage) || 10;
    if (per < 1) per = 1;
    if (per > 100) per = 100;

    const exists = await prisma.post.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!exists) return res.status(404).json({ error: "Post not found" });

    const [items] = await Promise.all([
      prisma.comment.findMany({
        where: { postId: id },
        orderBy: { createdAt: "desc" },
        skip: (pageNum - 1) * per,
        take: per,
      }),
    ]);

    return res.status(200).json(items);
  } catch {
    return res.status(500).json({ error: "Failed to get comments" });
  }
};

// GET /posts/comments-summary
export const getPostsCommentsSummary = async (req: Request, res: Response) => {
  try {
    const {
      minComments = "0",
      maxComments,
      page = "1",
      perPage = "10",
    } = req.query as Record<string, string | undefined>;

    let min = Number(minComments) || 0;
    if (min < 0) min = 0;

    const max =
      maxComments !== undefined
        ? Number(maxComments) || 0
        : Number.POSITIVE_INFINITY;
    if (maxComments !== undefined && max < min) {
      return res
        .status(400)
        .json({ error: "maxComments must be >= minComments" });
    }

    let pageNum = Number(page) || 1;
    if (pageNum < 1) pageNum = 1;

    let per = Number(perPage) || 10;
    if (per < 1) per = 1;
    if (per > 100) per = 100;

    const grouped = await prisma.comment.groupBy({
      by: ["postId"],
      _count: { _all: true },
    });

    const filtered = grouped.filter(
      (g) => g._count._all > min && g._count._all <= max
    );

    const start = (pageNum - 1) * per;
    const pageRows = filtered.slice(start, start + per);

    const data = pageRows.map((g) => ({
      postId: g.postId,
      commentsCount: g._count._all,
    }));

    return res.status(200).json(data);
  } catch {
    return res.status(500).json({ error: "Failed to get comments summary" });
  }
};
