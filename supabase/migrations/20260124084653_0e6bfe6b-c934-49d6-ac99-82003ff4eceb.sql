-- Create avatars bucket (public read)
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- RLS policies for avatar objects
-- Public read access for avatars
create policy "Avatar images are publicly accessible"
on storage.objects
for select
using (bucket_id = 'avatars');

-- Authenticated users can upload avatars to a folder named by their uid: <uid>/<filename>
create policy "Users can upload their own avatar"
on storage.objects
for insert
with check (
  bucket_id = 'avatars'
  and auth.role() = 'authenticated'
  and auth.uid()::text = (storage.foldername(name))[1]
);

create policy "Users can update their own avatar"
on storage.objects
for update
using (
  bucket_id = 'avatars'
  and auth.role() = 'authenticated'
  and auth.uid()::text = (storage.foldername(name))[1]
);

create policy "Users can delete their own avatar"
on storage.objects
for delete
using (
  bucket_id = 'avatars'
  and auth.role() = 'authenticated'
  and auth.uid()::text = (storage.foldername(name))[1]
);