import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.scss";
import { SidebarContext } from "../hooks/SidebarContext";
import { NavigationLinks, NavigationLowerLinks } from "../../data/SidebarData";
import { Icons, Public } from "../../data/Assets";

const API_ENDPOINT = "https://trickuweb.com/upload/profile_pic";
const AUTH_TOKEN = "adhgsdaksdhk938742937423"; // Replace with real token

const Sidebar = () => {
  const { isSidebarOpen } = useContext(SidebarContext);
  const location = useLocation();
  const sidebarClass = isSidebarOpen ? "sidebarDown" : "";

  const fileInput = useRef(null);
  const [file, setFile] = useState(null);
  const [logo, setLogo] = useState("");

  // Create preview URL for selected logo
  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setLogo(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const selectFile = useCallback((e) => {
    const picked = e.target.files?.[0];
    if (picked) setFile(picked);
  }, []);

  const uploadFile = useCallback(async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
        body: formData,
      });
      const { img_url } = await res.json();
      if (img_url) setLogo(img_url);
      setFile(null);
    } catch (err) {
      console.error("Upload error:", err);
    }
  }, [file]);

  const renderNavLinks = useCallback(
    (links) =>
      links.map(({ id, link, icon: Icon, title }) => (
        <li
          key={id}
          className={`navObject ${location.pathname === link ? "active" : ""}`}
          data-tooltip={title}
        >
          <Link to={link || "#"} className="navPath">
            <Icon className="navIcon" />
            <span className="navText">{title}</span>
          </Link>
        </li>
      )),
    [location.pathname]
  );

  const previewImage = useMemo(
    () => (
      <img
        src={logo || Public.Placeholder}
        alt="Logo"
        className="clientLogoPhoto"
      />
    ),
    [logo]
  );

  return (
    <aside className={`sideBarContainer ${sidebarClass}`}>
      <div className="sideBarContent">
        {/* ─── Top ─── */}
        <header className="sideBarTop">
          <figure
            className="clientLogoImg"
            onClick={() => fileInput.current?.click()}
          >
            {previewImage}
            <input
              ref={fileInput}
              type="file"
              accept="image/*"
              id="clientLogoFile"
              onChange={selectFile}
            />
            {file && (
              <button id="uploadBtn" onClick={uploadFile}>
                <Icons.Upload className="uploadIcon" />
              </button>
            )}
          </figure>
          <h2 className="clientName">Company Name</h2>
        </header>

        <hr />

        {/* ─── Center Navigation ─── */}
        <section className="sideBarCenter">
          <nav className="navContainer">
            <ul className="navContent">
              <li
                className={`navObject ${
                  location.pathname === "/" ? "active" : ""
                }`}
                data-tooltip="Overview"
              >
                <Link to="/" className="navPath">
                  <Icons.Overview className="navIcon" />
                  <span className="navText">Overview</span>
                </Link>
              </li>
            </ul>
          </nav>

          <hr />

          <nav className="navContainer">
            <ul className="navContent">{renderNavLinks(NavigationLinks)}</ul>
          </nav>
        </section>

        <hr />

        {/* ─── Bottom Navigation ─── */}
        <footer className="sideBarBottom">
          <nav className="navContainer">
            <ul className="navContent">
              {renderNavLinks(NavigationLowerLinks)}
            </ul>
          </nav>
        </footer>
      </div>
    </aside>
  );
};

export default Sidebar;
