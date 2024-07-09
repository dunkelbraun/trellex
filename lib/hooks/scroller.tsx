"use client";

import { useEffect, useRef, type RefObject } from "react";

// Adapted component as hook from https://github.com/aurorascharff/next14-message-box
// https://raw.githubusercontent.com/aurorascharff/next14-message-box/main/components/AutomaticScroller.tsx

// MIT License
// Copyright (c) 2023 Aurora Scharff
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies ßof the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

interface UseScrollerProps {
	behavior: ScrollBehavior;
	direction: "bottom" | "right";
	observeSubtree?: boolean;
	condition?: (record: MutationRecord[]) => boolean;
	refToScroll?: RefObject<HTMLElement | null>;
}

export const useScroller = <T extends HTMLElement>({
	behavior,
	direction,
	observeSubtree,
	condition,
	refToScroll,
}: UseScrollerProps): RefObject<T | null> => {
	const ref = useRef<T>(null);

	useEffect(() => {
		const mutationObserver = new MutationObserver((record) => {
			const scrollRef = (refToScroll ?? ref).current;
			if (scrollRef) {
				const performScroll = condition !== undefined ? condition(record) : true;
				if (performScroll) {
					switch (direction) {
						case "bottom":
							scrollRef.scrollTo({ behavior, top: scrollRef.scrollHeight });
							break;
						case "right":
							scrollRef.scrollTo({ behavior, left: scrollRef.scrollWidth });
							break;
					}
				}
			}
		});

		if (ref.current) {
			mutationObserver.observe(ref.current, { childList: true, subtree: observeSubtree ?? false });
			return () => {
				mutationObserver.disconnect();
			};
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ref]);

	return ref;
};
