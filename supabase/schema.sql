-- Create tables for our publishing platform
create type "book_format" as enum ('paperback', 'hardcover', 'ebook');

create table "public"."profiles" (
  id uuid references auth.users on delete cascade,
  full_name text,
  avatar_url text,
  bio text,
  website text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

create table "public"."books" (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text not null unique,
  description text,
  cover_image text,
  author_id uuid references public.profiles on delete cascade not null,
  price decimal(10,2) not null,
  format book_format not null default 'paperback',
  preview_content text,
  is_published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table "public"."sales" (
  id uuid default uuid_generate_v4() primary key,
  book_id uuid references public.books on delete cascade not null,
  buyer_id uuid references public.profiles on delete set null,
  amount decimal(10,2) not null,
  status text not null default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table "public"."profiles" enable row level security;
alter table "public"."books" enable row level security;
alter table "public"."sales" enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone"
  on profiles for select
  using ( true );

create policy "Users can insert their own profile"
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile"
  on profiles for update
  using ( auth.uid() = id );

create policy "Published books are viewable by everyone"
  on books for select
  using ( is_published = true );

create policy "Authors can view all their books"
  on books for select
  using ( auth.uid() = author_id );

create policy "Authors can create books"
  on books for insert
  with check ( auth.uid() = author_id );

create policy "Authors can update their books"
  on books for update
  using ( auth.uid() = author_id );

-- Create functions
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Create triggers
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user(); 