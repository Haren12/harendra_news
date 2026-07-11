import harendraAvatar from '../assets/harendra_avatar.jpg';

export function getAuthorAvatar(author?: { name?: string; avatar?: string } | null): string {
  if (!author) return harendraAvatar;
  if (author.name && author.name.toLowerCase().includes('harendra')) {
    return harendraAvatar;
  }
  if (author.avatar && (author.avatar.includes('harendra') || author.avatar.endsWith('.jpg') || author.avatar.endsWith('.png'))) {
    return author.avatar;
  }
  return author.avatar || harendraAvatar;
}
