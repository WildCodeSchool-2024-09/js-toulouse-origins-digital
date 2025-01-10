import Header from "../components/Header";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";

export default function Search() {
  return (
    <>
      <Header />
      <SearchBar />
      <div
        style={{
          width: "100vw",
          height: "100vh",
          position: "absolute",
          top: "0",
        }}
      />
      <NavBar />
    </>
  );
}
