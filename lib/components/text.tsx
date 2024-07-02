"use client";

import React, { type JSX, type ReactNode } from "react";
import { Text as ReshapedText } from "reshaped";

type FontWeights = "regular" | "medium" | "semibold" | "bold" | "heavy" | "black";

type WrappedProps<As extends keyof JSX.IntrinsicElements> = Omit<
	React.ComponentProps<typeof ReshapedText>,
	"weight"
> & {
	weight?: FontWeights;
};

export function Text<As extends keyof JSX.IntrinsicElements>({
	weight,
	children,
	...props
}: WrappedProps<As> & {
	children: ReactNode;
}) {
	return (
		<span style={{ fontWeight: `var(--rs-font-weight-${weight})` }}>
			<ReshapedText {...props}>{children}</ReshapedText>
		</span>
	);
}
