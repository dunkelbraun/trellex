export function outsideRect({ rect, coords }: { rect: DOMRect; coords: { x: number; y: number } }) {
	return (
		coords.x < rect.left || coords.x > rect.right || coords.y < rect.top || coords.y > rect.bottom
	);
}
