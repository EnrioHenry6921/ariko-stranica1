function Stars({ rating }: { rating: number }) {
  return (
    <div className="review-card__stars" aria-label={`${rating} od 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ fontSize: 15, lineHeight: 1, color: i < rating ? "var(--ochre)" : "var(--line)" }}>
          ★
        </span>
      ))}
    </div>
  );
}

export function ReviewCard({ name, role, rating, quote }: { name: string; role: string; rating: number; quote: string }) {
  const initial = name.trim().charAt(0).toUpperCase();
  return (
    <figure className="review-card">
      <Stars rating={rating} />
      <blockquote className="review-card__quote">{quote}</blockquote>
      <figcaption className="review-card__foot">
        <span className="review-card__avatar">{initial}</span>
        <span className="review-card__who">
          <span className="review-card__name">{name}</span>
          <span className="review-card__role">{role}</span>
        </span>
      </figcaption>
    </figure>
  );
}
