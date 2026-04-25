import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { useEffect } from "react";

import appCss from "../styles.css?url";
import { registerServiceWorker } from "../serviceWorkerRegistration";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "EconoMonteiro — Smart Finance Assistant" },
      { name: "description", content: "Track expenses, manage credit cards securely, and master your money in 7 languages." },
      { name: "author", content: "EconoMonteiro" },
      { name: "theme-color", content: "#6d28d9" },
      { property: "og:title", content: "EconoMonteiro — Smart Finance Assistant" },
      { property: "og:description", content: "Track expenses, manage credit cards securely, and master your money in 7 languages." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      // Security: prevent clickjacking & restrict referrer
      { httpEquiv: "X-Content-Type-Options", content: "nosniff" },
      { name: "referrer", content: "strict-origin-when-cross-origin" },
      { name: "twitter:title", content: "EconoMonteiro — Smart Finance Assistant" },
      { name: "twitter:description", content: "Track expenses, manage credit cards securely, and master your money in 7 languages." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fb104b44-0435-46ba-8160-3fbcb9126b3d/id-preview-f79f0067--b3ed358d-5c96-4bde-a0f1-97b42a344939.lovable.app-1776881952274.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fb104b44-0435-46ba-8160-3fbcb9126b3d/id-preview-f79f0067--b3ed358d-5c96-4bde-a0f1-97b42a344939.lovable.app-1776881952274.png" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "default" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "icon", type: "image/png", href: "/logo.png" },
      { rel: "apple-touch-icon", href: "/logo.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return <Outlet />;
}
