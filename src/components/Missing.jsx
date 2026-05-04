import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <main className="Missing">
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <p> Please check the URL or visit our homepage.</p>
      <p>
        <Link to="/">Visit Our Homepage</Link>
      </p>
    </main>
  );
};

export default Missing;
