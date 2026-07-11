import harendraAvatarLocal from '../assets/harendra_avatar.jpg';

export const harendraAvatar = harendraAvatarLocal;

export function getAuthorAvatar(author?: { name?: string; avatar?: string } | null | string): string {
  if (!author) return harendraAvatar;
  if (typeof author === 'string') {
    if (author.toLowerCase().includes('harendra') || author.includes('harendra_avatar') || author.includes('harendra_lamsal') || author.includes('unsplash.com/photo-1534528741775')) {
      return harendraAvatar;
    }
    return author;
  }
  if (author.name && author.name.toLowerCase().includes('harendra')) {
    return harendraAvatar;
  }
  if (author.avatar) {
    if (author.avatar.includes('harendra') || author.avatar.includes('unsplash.com/photo-1534528741775-53994a69daeb') || author.avatar.includes('harendra_lamsal') || author.avatar.includes('harendra_avatar.jpg')) {
      return harendraAvatar;
    }
    return author.avatar;
  }
  return harendraAvatar;
}



