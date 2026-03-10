-- =============================================
-- Sama Music App — Seed Data
-- =============================================
-- 5 artists, 3 albums each, 5 tracks per album, 4 curated playlists

-- =============================================
-- ARTISTS
-- =============================================

INSERT INTO public.artists (id, name, bio, image_url, genre, followers_count) VALUES
('a1000000-0000-0000-0000-000000000001', 'Maher Zain', 'Swedish-Lebanese singer, songwriter, and music producer. Known worldwide for his Islamic nasheeds that blend modern pop with spiritual themes.', 'https://res.cloudinary.com/demo/image/upload/v1/sama/artists/maher-zain.jpg', 'nasheeds', 125000),
('a1000000-0000-0000-0000-000000000002', 'Mishary Rashid Alafasy', 'Kuwaiti imam and Quran reciter known for his melodious and moving recitations. His voice has touched millions of hearts worldwide.', 'https://res.cloudinary.com/demo/image/upload/v1/sama/artists/mishary-alafasy.jpg', 'quran', 250000),
('a1000000-0000-0000-0000-000000000003', 'Sami Yusuf', 'British singer-songwriter of Azerbaijani origin. A pioneer of modern Islamic music, blending Eastern and Western musical traditions.', 'https://res.cloudinary.com/demo/image/upload/v1/sama/artists/sami-yusuf.jpg', 'nasheeds', 98000),
('a1000000-0000-0000-0000-000000000004', 'Omar Esa', 'British nasheed artist known for his powerful vocals and emotionally moving Islamic songs that resonate with youth.', 'https://res.cloudinary.com/demo/image/upload/v1/sama/artists/omar-esa.jpg', 'anasheed', 45000),
('a1000000-0000-0000-0000-000000000005', 'Siedd', 'American Muslim artist known for ambient Islamic music and soothing nasheeds that promote peace and reflection.', 'https://res.cloudinary.com/demo/image/upload/v1/sama/artists/siedd.jpg', 'ambient', 67000);

-- =============================================
-- ALBUMS — Maher Zain
-- =============================================

INSERT INTO public.albums (id, title, artist_id, cover_url, release_year, category) VALUES
('b1000000-0000-0000-0000-000000000001', 'Thank You Allah', 'a1000000-0000-0000-0000-000000000001', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/thank-you-allah.jpg', 2009, 'nasheeds'),
('b1000000-0000-0000-0000-000000000002', 'Forgive Me', 'a1000000-0000-0000-0000-000000000001', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/forgive-me.jpg', 2012, 'nasheeds'),
('b1000000-0000-0000-0000-000000000003', 'One', 'a1000000-0000-0000-0000-000000000001', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/one.jpg', 2016, 'nasheeds');

-- ALBUMS — Mishary Alafasy
INSERT INTO public.albums (id, title, artist_id, cover_url, release_year, category) VALUES
('b1000000-0000-0000-0000-000000000004', 'Quran Recitations Vol. 1', 'a1000000-0000-0000-0000-000000000002', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/quran-vol1.jpg', 2010, 'quran'),
('b1000000-0000-0000-0000-000000000005', 'Beautiful Names', 'a1000000-0000-0000-0000-000000000002', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/beautiful-names.jpg', 2015, 'devotional'),
('b1000000-0000-0000-0000-000000000006', 'Tala Al Badru', 'a1000000-0000-0000-0000-000000000002', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/tala-al-badru.jpg', 2018, 'anasheed');

-- ALBUMS — Sami Yusuf
INSERT INTO public.albums (id, title, artist_id, cover_url, release_year, category) VALUES
('b1000000-0000-0000-0000-000000000007', 'Al-Mu''allim', 'a1000000-0000-0000-0000-000000000003', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/al-muallim.jpg', 2003, 'nasheeds'),
('b1000000-0000-0000-0000-000000000008', 'My Ummah', 'a1000000-0000-0000-0000-000000000003', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/my-ummah.jpg', 2005, 'nasheeds'),
('b1000000-0000-0000-0000-000000000009', 'Barakah', 'a1000000-0000-0000-0000-000000000003', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/barakah.jpg', 2016, 'devotional');

-- ALBUMS — Omar Esa
INSERT INTO public.albums (id, title, artist_id, cover_url, release_year, category) VALUES
('b1000000-0000-0000-0000-000000000010', 'Beloved', 'a1000000-0000-0000-0000-000000000004', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/beloved.jpg', 2019, 'anasheed'),
('b1000000-0000-0000-0000-000000000011', 'Reflections', 'a1000000-0000-0000-0000-000000000004', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/reflections.jpg', 2021, 'devotional'),
('b1000000-0000-0000-0000-000000000012', 'Light Upon Light', 'a1000000-0000-0000-0000-000000000004', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/light-upon-light.jpg', 2023, 'anasheed');

-- ALBUMS — Siedd
INSERT INTO public.albums (id, title, artist_id, cover_url, release_year, category) VALUES
('b1000000-0000-0000-0000-000000000013', 'Peaceful Souls', 'a1000000-0000-0000-0000-000000000005', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/peaceful-souls.jpg', 2020, 'ambient'),
('b1000000-0000-0000-0000-000000000014', 'Dua Collection', 'a1000000-0000-0000-0000-000000000005', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/dua-collection.jpg', 2022, 'devotional'),
('b1000000-0000-0000-0000-000000000015', 'Tranquility', 'a1000000-0000-0000-0000-000000000005', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/tranquility.jpg', 2024, 'ambient');

-- =============================================
-- TRACKS — Maher Zain - Thank You Allah
-- =============================================

INSERT INTO public.tracks (id, title, artist_id, album_id, audio_url, artwork_url, duration, track_number, category, plays_count) VALUES
('c1000000-0000-0000-0000-000000000001', 'Thank You Allah', 'a1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/thank-you-allah.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/thank-you-allah.jpg', 256, 1, 'nasheeds', 450000),
('c1000000-0000-0000-0000-000000000002', 'Ya Nabi Salam Alayka', 'a1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/ya-nabi.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/thank-you-allah.jpg', 312, 2, 'nasheeds', 380000),
('c1000000-0000-0000-0000-000000000003', 'Insha Allah', 'a1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/insha-allah.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/thank-you-allah.jpg', 289, 3, 'nasheeds', 520000),
('c1000000-0000-0000-0000-000000000004', 'Allahi Allah Kiya Karo', 'a1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/allahi-allah.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/thank-you-allah.jpg', 245, 4, 'nasheeds', 210000),
('c1000000-0000-0000-0000-000000000005', 'The Chosen One', 'a1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/chosen-one.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/thank-you-allah.jpg', 278, 5, 'nasheeds', 195000);

-- TRACKS — Maher Zain - Forgive Me
INSERT INTO public.tracks (id, title, artist_id, album_id, audio_url, artwork_url, duration, track_number, category, plays_count) VALUES
('c1000000-0000-0000-0000-000000000006', 'Forgive Me', 'a1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000002', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/forgive-me.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/forgive-me.jpg', 267, 1, 'nasheeds', 320000),
('c1000000-0000-0000-0000-000000000007', 'Number One For Me', 'a1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000002', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/number-one.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/forgive-me.jpg', 298, 2, 'nasheeds', 410000),
('c1000000-0000-0000-0000-000000000008', 'Love Will Prevail', 'a1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000002', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/love-prevail.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/forgive-me.jpg', 234, 3, 'nasheeds', 180000),
('c1000000-0000-0000-0000-000000000009', 'So Soon', 'a1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000002', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/so-soon.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/forgive-me.jpg', 251, 4, 'nasheeds', 145000),
('c1000000-0000-0000-0000-000000000010', 'Paradise', 'a1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000002', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/paradise.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/forgive-me.jpg', 276, 5, 'nasheeds', 290000);

-- TRACKS — Maher Zain - One
INSERT INTO public.tracks (id, title, artist_id, album_id, audio_url, artwork_url, duration, track_number, category, plays_count) VALUES
('c1000000-0000-0000-0000-000000000011', 'One Big Family', 'a1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000003', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/one-big-family.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/one.jpg', 243, 1, 'nasheeds', 165000),
('c1000000-0000-0000-0000-000000000012', 'Rahmatun Lil''Alameen', 'a1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000003', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/rahmatun.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/one.jpg', 301, 2, 'nasheeds', 780000),
('c1000000-0000-0000-0000-000000000013', 'Huwa Al Quran', 'a1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000003', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/huwa-al-quran.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/one.jpg', 268, 3, 'nasheeds', 220000),
('c1000000-0000-0000-0000-000000000014', 'Peace Be Upon You', 'a1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000003', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/peace-upon-you.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/one.jpg', 234, 4, 'nasheeds', 175000),
('c1000000-0000-0000-0000-000000000015', 'Assubhu Bada', 'a1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000003', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/assubhu-bada.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/one.jpg', 287, 5, 'nasheeds', 340000);

-- TRACKS — Mishary - Quran Recitations Vol. 1
INSERT INTO public.tracks (id, title, artist_id, album_id, audio_url, artwork_url, duration, track_number, category, plays_count) VALUES
('c1000000-0000-0000-0000-000000000016', 'Surah Al-Fatiha', 'a1000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000004', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/al-fatiha.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/quran-vol1.jpg', 62, 1, 'quran', 890000),
('c1000000-0000-0000-0000-000000000017', 'Surah Yasin', 'a1000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000004', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/yasin.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/quran-vol1.jpg', 1450, 2, 'quran', 650000),
('c1000000-0000-0000-0000-000000000018', 'Surah Ar-Rahman', 'a1000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000004', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/ar-rahman.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/quran-vol1.jpg', 780, 3, 'quran', 720000),
('c1000000-0000-0000-0000-000000000019', 'Surah Al-Mulk', 'a1000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000004', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/al-mulk.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/quran-vol1.jpg', 620, 4, 'quran', 540000),
('c1000000-0000-0000-0000-000000000020', 'Surah Al-Kahf', 'a1000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000004', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/al-kahf.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/quran-vol1.jpg', 2100, 5, 'quran', 480000);

-- TRACKS — Mishary - Beautiful Names
INSERT INTO public.tracks (id, title, artist_id, album_id, audio_url, artwork_url, duration, track_number, category, plays_count) VALUES
('c1000000-0000-0000-0000-000000000021', 'Ar-Rahman (The Most Merciful)', 'a1000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000005', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/ar-rahman-name.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/beautiful-names.jpg', 198, 1, 'devotional', 230000),
('c1000000-0000-0000-0000-000000000022', 'Al-Wadud (The Loving)', 'a1000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000005', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/al-wadud.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/beautiful-names.jpg', 215, 2, 'devotional', 190000),
('c1000000-0000-0000-0000-000000000023', 'As-Salam (The Source of Peace)', 'a1000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000005', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/as-salam.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/beautiful-names.jpg', 187, 3, 'devotional', 165000),
('c1000000-0000-0000-0000-000000000024', 'Al-Ghaffar (The Forgiver)', 'a1000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000005', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/al-ghaffar.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/beautiful-names.jpg', 203, 4, 'devotional', 178000),
('c1000000-0000-0000-0000-000000000025', 'An-Nur (The Light)', 'a1000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000005', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/an-nur.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/beautiful-names.jpg', 224, 5, 'devotional', 210000);

-- TRACKS — Mishary - Tala Al Badru
INSERT INTO public.tracks (id, title, artist_id, album_id, audio_url, artwork_url, duration, track_number, category, plays_count) VALUES
('c1000000-0000-0000-0000-000000000026', 'Tala Al Badru Alayna', 'a1000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000006', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/tala-al-badru.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/tala-al-badru.jpg', 234, 1, 'anasheed', 560000),
('c1000000-0000-0000-0000-000000000027', 'Qamarun', 'a1000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000006', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/qamarun.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/tala-al-badru.jpg', 267, 2, 'anasheed', 430000),
('c1000000-0000-0000-0000-000000000028', 'Hasbi Rabbi', 'a1000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000006', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/hasbi-rabbi.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/tala-al-badru.jpg', 298, 3, 'anasheed', 310000),
('c1000000-0000-0000-0000-000000000029', 'Muhammad Nabina', 'a1000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000006', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/muhammad-nabina.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/tala-al-badru.jpg', 245, 4, 'anasheed', 280000),
('c1000000-0000-0000-0000-000000000030', 'Ya Taiba', 'a1000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000006', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/ya-taiba.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/tala-al-badru.jpg', 256, 5, 'anasheed', 350000);

-- TRACKS — Sami Yusuf - Al-Mu'allim
INSERT INTO public.tracks (id, title, artist_id, album_id, audio_url, artwork_url, duration, track_number, category, plays_count) VALUES
('c1000000-0000-0000-0000-000000000031', 'Al-Mu''allim', 'a1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000007', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/al-muallim.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/al-muallim.jpg', 287, 1, 'nasheeds', 670000),
('c1000000-0000-0000-0000-000000000032', 'Supplication', 'a1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000007', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/supplication.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/al-muallim.jpg', 245, 2, 'nasheeds', 340000),
('c1000000-0000-0000-0000-000000000033', 'Mother', 'a1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000007', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/mother.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/al-muallim.jpg', 256, 3, 'nasheeds', 290000),
('c1000000-0000-0000-0000-000000000034', 'Free', 'a1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000007', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/free.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/al-muallim.jpg', 234, 4, 'nasheeds', 210000),
('c1000000-0000-0000-0000-000000000035', 'Ya Mustafa', 'a1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000007', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/ya-mustafa.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/al-muallim.jpg', 312, 5, 'nasheeds', 420000);

-- TRACKS — Sami Yusuf - My Ummah
INSERT INTO public.tracks (id, title, artist_id, album_id, audio_url, artwork_url, duration, track_number, category, plays_count) VALUES
('c1000000-0000-0000-0000-000000000036', 'My Ummah', 'a1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000008', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/my-ummah.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/my-ummah.jpg', 298, 1, 'nasheeds', 380000),
('c1000000-0000-0000-0000-000000000037', 'Healing', 'a1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000008', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/healing.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/my-ummah.jpg', 276, 2, 'nasheeds', 250000),
('c1000000-0000-0000-0000-000000000038', 'Try Not to Cry', 'a1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000008', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/try-not-cry.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/my-ummah.jpg', 267, 3, 'nasheeds', 310000),
('c1000000-0000-0000-0000-000000000039', 'You Came to Me', 'a1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000008', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/you-came.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/my-ummah.jpg', 289, 4, 'nasheeds', 270000),
('c1000000-0000-0000-0000-000000000040', 'Make Me Strong', 'a1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000008', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/make-me-strong.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/my-ummah.jpg', 245, 5, 'nasheeds', 360000);

-- TRACKS — Sami Yusuf - Barakah
INSERT INTO public.tracks (id, title, artist_id, album_id, audio_url, artwork_url, duration, track_number, category, plays_count) VALUES
('c1000000-0000-0000-0000-000000000041', 'Barakah', 'a1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000009', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/barakah.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/barakah.jpg', 278, 1, 'devotional', 190000),
('c1000000-0000-0000-0000-000000000042', 'When Paths Meet', 'a1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000009', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/when-paths-meet.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/barakah.jpg', 312, 2, 'devotional', 145000),
('c1000000-0000-0000-0000-000000000043', 'Autumn', 'a1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000009', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/autumn.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/barakah.jpg', 234, 3, 'devotional', 120000),
('c1000000-0000-0000-0000-000000000044', 'Silent Words', 'a1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000009', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/silent-words.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/barakah.jpg', 267, 4, 'devotional', 98000),
('c1000000-0000-0000-0000-000000000045', 'The Dawn', 'a1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000009', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/the-dawn.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/barakah.jpg', 298, 5, 'devotional', 130000);

-- TRACKS — Omar Esa - Beloved
INSERT INTO public.tracks (id, title, artist_id, album_id, audio_url, artwork_url, duration, track_number, category, plays_count) VALUES
('c1000000-0000-0000-0000-000000000046', 'Ya Habibi', 'a1000000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000010', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/ya-habibi.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/beloved.jpg', 245, 1, 'anasheed', 120000),
('c1000000-0000-0000-0000-000000000047', 'The Prophet''s Garden', 'a1000000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000010', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/prophets-garden.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/beloved.jpg', 267, 2, 'anasheed', 98000),
('c1000000-0000-0000-0000-000000000048', 'Medina', 'a1000000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000010', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/medina.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/beloved.jpg', 289, 3, 'anasheed', 85000),
('c1000000-0000-0000-0000-000000000049', 'Hearts of Gold', 'a1000000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000010', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/hearts-of-gold.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/beloved.jpg', 234, 4, 'anasheed', 72000),
('c1000000-0000-0000-0000-000000000050', 'Salawat', 'a1000000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000010', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/salawat.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/beloved.jpg', 256, 5, 'anasheed', 91000);

-- TRACKS — Omar Esa - Reflections
INSERT INTO public.tracks (id, title, artist_id, album_id, audio_url, artwork_url, duration, track_number, category, plays_count) VALUES
('c1000000-0000-0000-0000-000000000051', 'In Your Name', 'a1000000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000011', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/in-your-name.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/reflections.jpg', 278, 1, 'devotional', 65000),
('c1000000-0000-0000-0000-000000000052', 'Remember Me', 'a1000000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000011', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/remember-me.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/reflections.jpg', 245, 2, 'devotional', 58000),
('c1000000-0000-0000-0000-000000000053', 'Sabr (Patience)', 'a1000000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000011', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/sabr.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/reflections.jpg', 298, 3, 'devotional', 72000),
('c1000000-0000-0000-0000-000000000054', 'Grateful Heart', 'a1000000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000011', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/grateful-heart.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/reflections.jpg', 234, 4, 'devotional', 48000),
('c1000000-0000-0000-0000-000000000055', 'Tawakkul (Trust)', 'a1000000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000011', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/tawakkul.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/reflections.jpg', 267, 5, 'devotional', 53000);

-- TRACKS — Omar Esa - Light Upon Light
INSERT INTO public.tracks (id, title, artist_id, album_id, audio_url, artwork_url, duration, track_number, category, plays_count) VALUES
('c1000000-0000-0000-0000-000000000056', 'Noor Ala Noor', 'a1000000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000012', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/noor-ala-noor.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/light-upon-light.jpg', 256, 1, 'anasheed', 78000),
('c1000000-0000-0000-0000-000000000057', 'Eid Mubarak', 'a1000000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000012', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/eid-mubarak.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/light-upon-light.jpg', 234, 2, 'anasheed', 95000),
('c1000000-0000-0000-0000-000000000058', 'Ramadan Kareem', 'a1000000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000012', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/ramadan-kareem.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/light-upon-light.jpg', 289, 3, 'anasheed', 110000),
('c1000000-0000-0000-0000-000000000059', 'Hajj Journey', 'a1000000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000012', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/hajj-journey.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/light-upon-light.jpg', 312, 4, 'anasheed', 67000),
('c1000000-0000-0000-0000-000000000060', 'Bismillah', 'a1000000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000012', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/bismillah.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/light-upon-light.jpg', 245, 5, 'anasheed', 82000);

-- TRACKS — Siedd - Peaceful Souls
INSERT INTO public.tracks (id, title, artist_id, album_id, audio_url, artwork_url, duration, track_number, category, plays_count) VALUES
('c1000000-0000-0000-0000-000000000061', 'Peaceful Soul', 'a1000000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000013', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/peaceful-soul.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/peaceful-souls.jpg', 312, 1, 'ambient', 156000),
('c1000000-0000-0000-0000-000000000062', 'Morning Adhkar', 'a1000000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000013', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/morning-adhkar.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/peaceful-souls.jpg', 456, 2, 'ambient', 230000),
('c1000000-0000-0000-0000-000000000063', 'Evening Reflection', 'a1000000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000013', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/evening-reflection.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/peaceful-souls.jpg', 389, 3, 'ambient', 180000),
('c1000000-0000-0000-0000-000000000064', 'Rain and Quran', 'a1000000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000013', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/rain-quran.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/peaceful-souls.jpg', 534, 4, 'ambient', 290000),
('c1000000-0000-0000-0000-000000000065', 'Tahajjud Ambience', 'a1000000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000013', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/tahajjud.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/peaceful-souls.jpg', 478, 5, 'ambient', 198000);

-- TRACKS — Siedd - Dua Collection
INSERT INTO public.tracks (id, title, artist_id, album_id, audio_url, artwork_url, duration, track_number, category, plays_count) VALUES
('c1000000-0000-0000-0000-000000000066', 'Dua for Parents', 'a1000000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000014', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/dua-parents.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/dua-collection.jpg', 198, 1, 'devotional', 145000),
('c1000000-0000-0000-0000-000000000067', 'Dua for Guidance', 'a1000000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000014', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/dua-guidance.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/dua-collection.jpg', 215, 2, 'devotional', 167000),
('c1000000-0000-0000-0000-000000000068', 'Dua for Protection', 'a1000000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000014', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/dua-protection.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/dua-collection.jpg', 187, 3, 'devotional', 134000),
('c1000000-0000-0000-0000-000000000069', 'Dua for the Ummah', 'a1000000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000014', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/dua-ummah.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/dua-collection.jpg', 223, 4, 'devotional', 112000),
('c1000000-0000-0000-0000-000000000070', 'Dua Before Sleep', 'a1000000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000014', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/dua-sleep.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/dua-collection.jpg', 245, 5, 'devotional', 189000);

-- TRACKS — Siedd - Tranquility
INSERT INTO public.tracks (id, title, artist_id, album_id, audio_url, artwork_url, duration, track_number, category, plays_count) VALUES
('c1000000-0000-0000-0000-000000000071', 'Sakina', 'a1000000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000015', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/sakina.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/tranquility.jpg', 356, 1, 'ambient', 98000),
('c1000000-0000-0000-0000-000000000072', 'Garden of Jannah', 'a1000000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000015', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/garden-jannah.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/tranquility.jpg', 423, 2, 'ambient', 87000),
('c1000000-0000-0000-0000-000000000073', 'Waterfall Dhikr', 'a1000000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000015', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/waterfall-dhikr.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/tranquility.jpg', 389, 3, 'ambient', 76000),
('c1000000-0000-0000-0000-000000000074', 'Moonlit Salah', 'a1000000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000015', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/moonlit-salah.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/tranquility.jpg', 445, 4, 'ambient', 65000),
('c1000000-0000-0000-0000-000000000075', 'Fajr Serenity', 'a1000000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000015', 'https://res.cloudinary.com/demo/video/upload/v1/sama/audio/fajr-serenity.mp3', 'https://res.cloudinary.com/demo/image/upload/v1/sama/albums/tranquility.jpg', 512, 5, 'ambient', 72000);

-- =============================================
-- CURATED PLAYLISTS
-- =============================================

INSERT INTO public.playlists (id, title, description, cover_url, is_curated) VALUES
('d1000000-0000-0000-0000-000000000001', 'Top Nasheeds', 'The best nasheeds from around the world, curated for your spiritual journey.', 'https://res.cloudinary.com/demo/image/upload/v1/sama/playlists/top-nasheeds.jpg', true),
('d1000000-0000-0000-0000-000000000002', 'Quran for Reflection', 'Beautiful Quran recitations for deep contemplation and peace of mind.', 'https://res.cloudinary.com/demo/image/upload/v1/sama/playlists/quran-reflection.jpg', true),
('d1000000-0000-0000-0000-000000000003', 'Ramadan Essentials', 'Your spiritual companion during the blessed month of Ramadan.', 'https://res.cloudinary.com/demo/image/upload/v1/sama/playlists/ramadan-essentials.jpg', true),
('d1000000-0000-0000-0000-000000000004', 'Calm & Focus', 'Ambient Islamic sounds for meditation, study, and relaxation.', 'https://res.cloudinary.com/demo/image/upload/v1/sama/playlists/calm-focus.jpg', true);

-- Playlist tracks for "Top Nasheeds"
INSERT INTO public.playlist_tracks (playlist_id, track_id, position) VALUES
('d1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000003', 0),
('d1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000012', 1),
('d1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000031', 2),
('d1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000002', 3),
('d1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000015', 4),
('d1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000007', 5),
('d1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000040', 6),
('d1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000035', 7);

-- Playlist tracks for "Quran for Reflection"
INSERT INTO public.playlist_tracks (playlist_id, track_id, position) VALUES
('d1000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000016', 0),
('d1000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000018', 1),
('d1000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000017', 2),
('d1000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000019', 3),
('d1000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000020', 4);

-- Playlist tracks for "Ramadan Essentials"
INSERT INTO public.playlist_tracks (playlist_id, track_id, position) VALUES
('d1000000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000058', 0),
('d1000000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000026', 1),
('d1000000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000001', 2),
('d1000000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000016', 3),
('d1000000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000062', 4),
('d1000000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000066', 5);

-- Playlist tracks for "Calm & Focus"
INSERT INTO public.playlist_tracks (playlist_id, track_id, position) VALUES
('d1000000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000061', 0),
('d1000000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000064', 1),
('d1000000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000071', 2),
('d1000000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000065', 3),
('d1000000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000073', 4),
('d1000000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000063', 5),
('d1000000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000074', 6);
