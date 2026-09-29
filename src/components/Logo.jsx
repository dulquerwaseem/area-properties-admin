import logo from "../assets/logo.svg";

export default function Logo({ small }) {
  return (
    <img
      src={logo}
      alt="Area Properties"
      className={small ? "h-7 w-auto" : "h-9 w-auto"}
    />
  );
}
