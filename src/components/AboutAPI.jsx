const AboutAPI = () => {
  return (
    <main className="About">
      <h2>About RESTful API</h2>
      {/* Project description paragraph  */}
      <p style={{ marginTop: "1rem" }}>
        This project showcases my ability to build a RESTful API using Node.js, Express, and MongoDB
        to manage U.S. state data. I structured the application using the Model-View-Controller
        (MVC) pattern to ensure clean separation of concerns and maintainable code. The server
        handles full CRUD operations via GET, POST, PATCH, and DELETE requests, with routes defined
        in Express and validated through custom middleware.
      </p>
      <p>
        I used Mongoose to define and enforce a schema for MongoDB, enabling structured storage of
        state-specific fun facts. The API merges static JSON data with dynamic database content
        using a custom function, allowing enriched responses while preserving original metadata. I
        tested all endpoints locally using Postman to verify proper JSON responses and error
        handling.
      </p>
      {/* Accepted request list */}
      <h2>GET Accepted Requests</h2>
      <p>
        <i>(:states - must be an abbreviation of a state)</i>
      </p>
      <ul style={{ marginTop: "1rem" }}>
        <li>/states/</li>
        <li>/states/?contig=true</li>
        <li>/states/?contig=false</li>
        <li>/states/:state/funfact</li>
        <li>/states/:state/capital</li>
        <li>/states/:state/nickname</li>
        <li>/states/:state/population</li>
        <li>/states/:state/admission</li>
      </ul>
    </main>
  );
};

export default AboutAPI;
