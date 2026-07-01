function hashString(value: string) {
    let hash = 0;

    for (let index = 0; index < value.length; index += 1) {
        hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
    }

    return hash;
}

function getInitials(name: string) {
    const parts = name.trim().split(/\s+/).filter(Boolean);

    if (parts.length === 0) {
        return "?";
    }

    if (parts.length === 1) {
        return parts[0].slice(0, 2).toUpperCase();
    }

    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

const avatarPalettes = [
    ["#6b2438", "#c99a3f"],
    ["#8a3550", "#e8c876"],
    ["#43101e", "#c99a3f"],
    ["#6b2438", "#ebe2c6"],
    ["#9c7527", "#6b2438"],
    ["#c99a3f", "#43101e"],
    ["#8a3550", "#9c7527"],
    ["#6b2438", "#8a3550"],
];

export function getAvatarFallbackUrl(name: string) {
    const safeName = name.trim() || "Profile";
    const initials = getInitials(safeName);
    const palette = avatarPalettes[hashString(safeName) % avatarPalettes.length];
    const background = palette[0];
    const accent = palette[1];
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="${safeName}">
            <defs>
                <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="${background}" />
                    <stop offset="100%" stop-color="${accent}" />
                </linearGradient>
                <radialGradient id="shine" cx="30%" cy="25%" r="75%">
                    <stop offset="0%" stop-color="rgba(255,255,255,0.5)" />
                    <stop offset="60%" stop-color="rgba(255,255,255,0.08)" />
                    <stop offset="100%" stop-color="rgba(255,255,255,0)" />
                </radialGradient>
            </defs>
            <circle cx="60" cy="60" r="58" fill="url(#bg)" />
            <circle cx="60" cy="60" r="58" fill="url(#shine)" />
            <circle cx="60" cy="60" r="56" fill="none" stroke="rgba(255,255,255,0.22)" stroke-width="2" />
            <text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="40" font-weight="700" letter-spacing="1">${initials}</text>
    </svg>
  `;

    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}