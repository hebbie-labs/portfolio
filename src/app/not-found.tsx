import type { Metadata } from "next";

import { NotFoundPage } from "@/components/pages/not-found";
import { NOT_FOUND_PAGE } from "@/constants/not-found";

export const metadata: Metadata = { title: NOT_FOUND_PAGE.title };

export default NotFoundPage;
