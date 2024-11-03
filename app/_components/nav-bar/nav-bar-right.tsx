"use client";

import {
	ArrowLeftStartOnRectangleIcon,
	ArrowRightEndOnRectangleIcon,
	ArrowTopRightOnSquareIcon,
	Bars3Icon,
} from "@heroicons/react/24/outline";
import { use } from "react";
import { Button, DropdownMenu, Hidden, Link, Text, View } from "reshaped";
import { logout } from "./logout";

const linkData: Record<"nextJs" | "github", { href: string; text: string }> = {
	nextJs: {
		href: "https://nextjs.org",
		text: "Next.js",
	},
	github: {
		href: "https://github.com/dunkelbraun/trellex",
		text: "GitHub",
	},
};

export function NavBarRight({ userId }: { userId: Promise<string | undefined> }) {
	const resolvedUser = use(userId);
	return (
		<>
			<Hidden hide={{ s: false, m: true }}>
				<DropdownMenu>
					<DropdownMenu.Trigger>
						{(attributes) => (
							<Button
								attributes={{ ...attributes, "aria-label": "Menu", tabIndex: 0 }}
								variant="ghost"
							>
								<Bars3Icon height={24} width={24} color="inherit" />
							</Button>
						)}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Section>
							<View paddingInline={3} paddingBlock={2}>
								<Text color="neutral-faded">Links</Text>
							</View>
							<DropdownMenu.Item
								href={linkData.github.href}
								endSlot={<ArrowTopRightOnSquareIcon height={16} width={16} color="inherit" />}
								attributes={{ target: "_blank" }}
							>
								{linkData.github.text}
							</DropdownMenu.Item>
							<DropdownMenu.Item
								href={linkData.nextJs.href}
								endSlot={<ArrowTopRightOnSquareIcon height={16} width={16} color="inherit" />}
								attributes={{ target: "_blank" }}
							>
								{linkData.nextJs.text}
							</DropdownMenu.Item>
						</DropdownMenu.Section>
						<DropdownMenu.Section>
							<DropdownMenu.Item
								href={resolvedUser === undefined ? "/login" : undefined}
								onClick={
									resolvedUser !== undefined
										? async (e) => {
												await logout();
											}
										: async (e) => {
												console.log("AAAA");
											}
								}
								endSlot={
									resolvedUser === undefined ? (
										<ArrowLeftStartOnRectangleIcon height={16} width={16} />
									) : (
										<ArrowRightEndOnRectangleIcon height={16} width={16} />
									)
								}
							>
								{resolvedUser === undefined ? "Log in" : "Log out"}
							</DropdownMenu.Item>
						</DropdownMenu.Section>
					</DropdownMenu.Content>
				</DropdownMenu>
			</Hidden>
			<Hidden hide={{ s: true, m: false }}>
				<View direction="row" align="center" gap={2}>
					<View direction="row" gap={2} divided paddingEnd={4}>
						<Link
							color="inherit"
							variant="plain"
							href={linkData.github.href}
							attributes={{ target: "_blank" }}
						>
							{linkData.github.text}
						</Link>
						<Link
							color="inherit"
							variant="plain"
							href={linkData.nextJs.href}
							attributes={{ target: "_blank" }}
						>
							{linkData.nextJs.text}
						</Link>
					</View>
					{resolvedUser === undefined ? (
						<Link href="/login">
							<Button endIcon={<ArrowRightEndOnRectangleIcon />} size="medium" variant="ghost">
								Log in
							</Button>
						</Link>
					) : (
						<form action={logout}>
							<Button
								endIcon={<ArrowLeftStartOnRectangleIcon />}
								size="medium"
								variant="ghost"
								type="submit"
								attributes={{
									tabIndex: 0,
								}}
							>
								Log out
							</Button>
						</form>
					)}
				</View>
			</Hidden>
		</>
	);
}
