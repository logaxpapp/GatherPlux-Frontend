import { Suspense } from "react";
import Search from "./components/SearchPage.component";

export default function SearchPage() {
  return (
    <Suspense>
      <Search />
    </Suspense>
  );
}
