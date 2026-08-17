import {
  FileText,
  CheckCircle2,
  Circle,
  ThumbsUp,
  Eye,
} from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Post, Todo } from "@/types/user"

interface UserActivityTabProps {
  posts: Post[]
  todos: Todo[]
}

export function UserActivityTab({ posts, todos }: UserActivityTabProps) {
  const completedTodos = todos.filter((t) => t.completed).length

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Posts Section */}
        <Card className="border-border/80 bg-card/60 backdrop-blur-xs">
          <CardHeader className="pb-3 border-b border-border/40">
            <CardTitle className="text-lg font-bold flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="size-5 text-primary" />
                <span>Authored Articles & Posts</span>
              </div>
              <Badge variant="secondary">{posts.length} Publications</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            {posts.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground text-sm space-y-2">
                <FileText className="size-8 mx-auto opacity-40" />
                <p>No published articles found for this author.</p>
              </div>
            ) : (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="p-4 rounded-xl border border-border/50 bg-muted/20 hover:bg-muted/40 transition-colors space-y-2.5"
                >
                  <h4 className="font-bold text-sm text-foreground leading-snug">
                    {post.title}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                    {post.body}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-border/40 text-xs flex-wrap gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {post.tags?.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-[10px] px-1.5 py-0 capitalize font-normal"
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 text-muted-foreground text-[11px]">
                      {post.reactions?.likes !== undefined && (
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="size-3 text-primary" />
                          {post.reactions.likes}
                        </span>
                      )}
                      {post.views !== undefined && (
                        <span className="flex items-center gap-1">
                          <Eye className="size-3" />
                          {post.views} views
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* User Assigned Tasks / Todos Section */}
        <Card className="border-border/80 bg-card/60 backdrop-blur-xs">
          <CardHeader className="pb-3 border-b border-border/40">
            <CardTitle className="text-lg font-bold flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-5 text-emerald-500" />
                <span>Assigned Tasks & Todos</span>
              </div>
              <Badge variant="success">
                {completedTodos}/{todos.length} Completed
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-3">
            {todos.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground text-sm space-y-2">
                <CheckCircle2 className="size-8 mx-auto opacity-40" />
                <p>No active tasks assigned to this member.</p>
              </div>
            ) : (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  className={`p-3 rounded-xl border flex items-start gap-3 transition-colors ${
                    todo.completed
                      ? "border-emerald-500/20 bg-emerald-500/5 text-muted-foreground"
                      : "border-border/50 bg-muted/20 text-foreground"
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {todo.completed ? (
                      <CheckCircle2 className="size-4 text-emerald-500" />
                    ) : (
                      <Circle className="size-4 text-muted-foreground" />
                    )}
                  </div>
                  <p
                    className={`text-xs sm:text-sm font-medium leading-tight ${
                      todo.completed ? "line-through opacity-75" : ""
                    }`}
                  >
                    {todo.todo}
                  </p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
