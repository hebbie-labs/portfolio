import type { Metadata } from "next";

import { NotFoundPage } from "@/components/pages/NotFoundPage";
import { NOT_FOUND_PAGE } from "@/constants/notFound";

export const metadata: Metadata = { title: NOT_FOUND_PAGE.title };

export default NotFoundPage;
