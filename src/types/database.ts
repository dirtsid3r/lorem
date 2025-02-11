export type Book = {
  id: string
  title: string
  slug: string
  description: string | null
  cover_image: string | null
  author_id: string
  price: number
  format: 'paperback' | 'hardcover' | 'ebook'
  preview_content: string | null
  is_published: boolean
  created_at: string
  updated_at: string
}

export type Profile = {
  id: string
  full_name: string | null
  avatar_url: string | null
  bio: string | null
  website: string | null
  created_at: string
  updated_at: string
}

export type Sale = {
  id: string
  book_id: string
  buyer_id: string | null
  amount: number
  status: string
  created_at: string
} 