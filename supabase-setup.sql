-- ════════════════════════════════════════════════════════
-- KDN 보안관제 게시판 — Supabase 테이블 설정
-- Supabase 대시보드 > SQL Editor 에서 실행하세요.
-- ════════════════════════════════════════════════════════

-- 1. posts 테이블
CREATE TABLE IF NOT EXISTS posts (
  id           UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  title        TEXT        NOT NULL,
  content      TEXT        NOT NULL,
  category     TEXT        NOT NULL DEFAULT 'QnA'
                           CHECK (category IN ('공지', 'QnA', 'FAQ')),
  is_pinned    BOOLEAN     DEFAULT FALSE,
  author_id    UUID        REFERENCES auth.users(id) ON DELETE CASCADE,
  author_email TEXT        NOT NULL,
  view_count   INTEGER     DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 2. comments 테이블
CREATE TABLE IF NOT EXISTS comments (
  id           UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id      UUID        REFERENCES posts(id) ON DELETE CASCADE,
  content      TEXT        NOT NULL,
  author_id    UUID        REFERENCES auth.users(id) ON DELETE CASCADE,
  author_email TEXT        NOT NULL,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 3. 조회수 증가 RPC 함수
CREATE OR REPLACE FUNCTION increment_view(post_id UUID)
RETURNS VOID AS $$
  UPDATE posts SET view_count = view_count + 1 WHERE id = post_id;
$$ LANGUAGE SQL SECURITY DEFINER;

-- 4. RLS 활성화
ALTER TABLE posts    ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- 5. RLS 정책 — posts
CREATE POLICY "posts_select" ON posts FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "posts_insert" ON posts FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "posts_update" ON posts FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "posts_delete" ON posts FOR DELETE USING (auth.uid() = author_id);

-- 6. RLS 정책 — comments
CREATE POLICY "comments_select" ON comments FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "comments_insert" ON comments FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "comments_update" ON comments FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "comments_delete" ON comments FOR DELETE USING (auth.uid() = author_id);
