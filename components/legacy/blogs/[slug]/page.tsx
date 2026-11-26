"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { blogService, Blog } from "@/components/legacy/services/blogsapi";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  Eye,
  Heart,
  Share2,
  ArrowLeft,
  Loader2,
  User,
  Tag,
} from "lucide-react";
import Navbar from "../../components/pages/navbar";
import Header from "../../components/pages/header";
import Footer from "../../components/pages/footer";
import type { PublicBlog } from "@/lib/public-blogs";
import { portalApiBase } from "@/lib/portal-api";
import { toast } from "sonner";
import { BlogReaderPrompt } from "@/components/legacy/blogs/reader-prompt";
import { blogContentHtml } from "@/lib/blog-content";

const BLOG_VISITOR_ID_KEY = "earlyjobs.blogVisitorId";
const LIKED_BLOGS_KEY = "earlyjobs.likedBlogs";

function getBlogVisitorId() {
  try {
    let id = window.localStorage.getItem(BLOG_VISITOR_ID_KEY);
    if (!id) {
      id = crypto.randomUUID();
      window.localStorage.setItem(BLOG_VISITOR_ID_KEY, id);
    }
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

function hasLikedBlog(blogId: string) {
  try {
    const raw = window.localStorage.getItem(LIKED_BLOGS_KEY);
    const liked: string[] = raw ? JSON.parse(raw) : [];
    return Array.isArray(liked) && liked.includes(blogId);
  } catch {
    return false;
  }
}

function markBlogLiked(blogId: string) {
  try {
    const raw = window.localStorage.getItem(LIKED_BLOGS_KEY);
    const liked: string[] = raw ? JSON.parse(raw) : [];
    const next = Array.isArray(liked) ? liked : [];
    if (!next.includes(blogId)) {
      next.push(blogId);
      window.localStorage.setItem(LIKED_BLOGS_KEY, JSON.stringify(next));
    }
  } catch {
    // ignore storage failures; backend still enforces one like
  }
}

export default function BlogDetailPage({
  initialBlog = null,
  relatedBlogs: initialRelated = [],
}: {
  initialBlog?: PublicBlog | null;
  relatedBlogs?: PublicBlog[];
}) {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const [blog, setBlog] = useState<Blog | null>((initialBlog as Blog | null) ?? null);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>(initialRelated as Blog[]);
  const [loading, setLoading] = useState(!initialBlog);
  const [error, setError] = useState<string | null>(null);
  const [liking, setLiking] = useState(false);
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const midRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (initialBlog || !slug) return;
    fetchBlog();
  }, [slug, initialBlog]);

  // SSR can serve a stale like count; sync likes/views from the live API after mount.
  useEffect(() => {
    if (!slug || !initialBlog?._id) return;
    let cancelled = false;
    (async () => {
      try {
        const response = await fetch(
          `${portalApiBase()}/blogs/slug/${encodeURIComponent(slug)}`,
        );
        if (!response.ok || cancelled) return;
        const result = await response.json();
        const fresh = result?.data?.blog;
        if (!fresh || cancelled) return;
        setBlog((prev) =>
          prev
            ? {
                ...prev,
                likes: typeof fresh.likes === "number" ? fresh.likes : prev.likes,
                views: typeof fresh.views === "number" ? fresh.views : prev.views,
              }
            : prev,
        );
      } catch {
        // keep SSR payload
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug, initialBlog?._id]);

  useEffect(() => {
    if (!blog?._id) return;
    setAlreadyLiked(hasLikedBlog(blog._id));
  }, [blog?._id]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await blogService.getBlogBySlug(slug);
      
      if (response.success && response.data?.blog) {
        const blogData = response.data.blog;
        setBlog(blogData);
        await fetchRelatedBlogs(blogData.tags?.[0] || "", blogData._id);
      } else {
        setError("Blog not found");
      }
    } catch (err: any) {
      setError(err?.message || "Failed to load blog");
      console.error("Error fetching blog:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedBlogs = async (tag: string, excludeId: string) => {
    try {
      const [taggedResponse, latestResponse] = await Promise.all([
        tag
          ? blogService.getBlogs({ tag, limit: 6, status: "published" })
          : Promise.resolve(null),
        blogService.getBlogs({ limit: 6, status: "published" }),
      ]);

      const byTag =
        taggedResponse?.success && taggedResponse.data
          ? taggedResponse.data.blogs.filter((b) => b._id !== excludeId)
          : [];
      const byLatest =
        latestResponse?.success && latestResponse.data
          ? latestResponse.data.blogs.filter(
              (b) => b._id !== excludeId && !byTag.some((related) => related._id === b._id),
            )
          : [];

      setRelatedBlogs([...byTag, ...byLatest].slice(0, 3));
    } catch (err) {
      console.error("Error fetching related blogs:", err);
    }
  };

  const handleLike = async () => {
    if (!blog || alreadyLiked || liking) return;
    
    try {
      setLiking(true);
      const visitorId = getBlogVisitorId();
      const response = await blogService.likeBlog(blog._id, visitorId);
      if (response.success) {
        setBlog({ ...blog, likes: response.data.likes });
        markBlogLiked(blog._id);
        setAlreadyLiked(true);
        if (response.data.alreadyLiked) {
          toast.message("You already liked this blog");
        } else {
          toast.success("Blog liked!");
        }
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to like blog");
    } finally {
      setLiking(false);
    }
  };

  const handleShare = async () => {
    if (!blog) return;
    
    const url = window.location.href;
    const title = blog.title;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: blog.excerpt || "",
          url,
        });
      } catch (err) {
        // User cancelled share
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getAuthorName = (author: Blog["author"]) => {
    if (typeof author === "string") return "Unknown Author";
    return author.username || author.email || "Unknown Author";
  };

  const getAuthorPhoto = (author: Blog["author"]) => {
    if (typeof author === "string") return null;
    return author.profilePhotoUrl || null;
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
        </div>
        <Footer />
      </>
    );
  }

  if (error || !blog) {
    return (
      <>
        <Navbar />
        <Header />
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Not Found</h1>
          <p className="text-gray-600 mb-6">{error || "The blog you're looking for doesn't exist."}</p>
          <Button onClick={() => router.push("/blogs")} className="bg-orange-500 hover:bg-orange-600">
            Back to Blogs
          </Button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => router.push("/blogs")}
            className="mb-6 text-gray-600 hover:text-orange-600"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blogs
          </Button>

          {/* Featured Image */}
          {blog.featuredImage && (
            <div className="mb-8 w-full overflow-hidden rounded-2xl bg-gray-100 md:bg-transparent">
              <img
                src={blog.featuredImage}
                alt={blog.title}
                className="mx-auto h-auto w-full max-h-[220px] object-contain sm:max-h-[320px] md:max-h-none"
              />
            </div>
          )}

          {/* Blog Header */}
          <div className="mb-8">
            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {blog.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-orange-100 text-orange-700 hover:bg-orange-200"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {blog.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span className="font-medium">{getAuthorName(blog.author)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                <span>{blog.views || 0} views</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={handleLike}
                disabled={liking || alreadyLiked}
                variant="outline"
                className="flex items-center gap-2"
                aria-pressed={alreadyLiked}
              >
                <Heart
                  className={`h-5 w-5 ${liking ? "animate-pulse" : ""} ${alreadyLiked ? "fill-orange-500 text-orange-500" : ""}`}
                />
                {blog.likes || 0}
              </Button>
              <Button
                onClick={handleShare}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Share2 className="h-5 w-5" />
                Share
              </Button>
            </div>
          </div>

          {/* Blog Content */}
          <Card className="mb-12 border-0 shadow-lg">
            <CardContent className="p-8">
              {/* Excerpt */}
              {blog.excerpt && (
                <div className="text-xl text-gray-700 font-medium mb-8 pb-8 border-b border-gray-200">
                  {blog.excerpt}
                </div>
              )}

              {/* Content */}
              <div className="relative">
                <div
                  className="blog-body max-w-none text-[17px] leading-7 text-gray-700"
                  dangerouslySetInnerHTML={{ __html: blogContentHtml(blog.content) }}
                />
                <span ref={midRef} aria-hidden className="pointer-events-none absolute top-1/4 left-0 h-px w-px" />
              </div>
            </CardContent>
          </Card>

          {/* Related Blogs — auto-filled for every post, including future publishes */}
          {relatedBlogs.length > 0 && (
            <div className="mt-12 w-full">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Blogs</h2>
              <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
                {relatedBlogs.map((relatedBlog) => (
                  <Card
                    key={relatedBlog._id}
                    className="relative overflow-hidden border border-gray-100 hover:border-orange-200 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                      <img
                        src={relatedBlog.featuredImage || "/images/logo.png"}
                        alt={relatedBlog.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="mb-2 font-bold text-gray-900 line-clamp-2 transition-colors hover:text-orange-600">
                        <Link href={`/blogs/${relatedBlog.slug}`} className="after:absolute after:inset-0">
                          {relatedBlog.title}
                        </Link>
                      </h3>
                      {relatedBlog.excerpt && (
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {relatedBlog.excerpt}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
      <BlogReaderPrompt slug={blog.slug} midRef={midRef} />
    </>
  );
}
