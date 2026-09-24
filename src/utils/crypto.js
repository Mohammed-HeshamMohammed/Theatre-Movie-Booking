// Client-side password hashing. This is a static front-end demo with no
// backend, so this cannot provide real security guarantees (a reader of the
// bundle can see the algorithm, and localStorage is readable by anyone with
// device access) - it only avoids storing/comparing passwords as plain text.
export async function hashPassword(password) {
  const encoded = new TextEncoder().encode(password);
  const digest = await window.crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}
