import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import DataContext from "../context/DataContext";
import api from "../api/states";

const ContributePage = () => {
  const [postFunFact, setPostFunFact] = useState("");
  const [postCode, setPostCode] = useState("");

  const { setFunFacts } = useContext(DataContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //A Guard against empty input (prevents adding blank fun facts)
    if (!postFunFact.trim()) return;
    if (!postCode) return;

    try {
      // Axios POST signature: axios.post(url, requestBody, config) The second argument is treated as the request body and is automatically serialized to JSON. The state code is part of the URL path per the API design. Since we don’t need custom headers or other options, the config argument is omitted.

      const response = await api.post(`/states/${postCode}/funfact`, {
        funfacts: [postFunFact.trim()], // The API expects an array of fun facts, we wrap the single fun fact in an array.
      });
      setFunFacts(response.data.funfacts || []); // Assuming fun facts are part of the state data, adjust if they are separate
      setPostCode("");
      setPostFunFact("");
      navigate(`/state/${response.data.stateCode}`); // Navigate to the state page of the newly added fun fact
      // setRefetchKey((prev) => prev + 1); // Trigger re-fetch of state data to update the UI with the new fun fact
    } catch (err) {
      console.log("App.jsx - handleSubmit() - Errormessage:", err.message);
    }
  };

  return (
    <main className="NewFunFact">
      <h2>Contribute Fun Fact</h2>
      <form className="newFunFactForm" onSubmit={handleSubmit}>
        <label htmlFor="stateCode">State :</label>
        <select
          id="stateCode"
          value={postCode}
          onChange={(e) => setPostCode(e.target.value)}
          required
        >
          <option value="" disabled>
            Select
          </option>

          <option value="AL">Alabama</option>
          <option value="AK">Alaska</option>
          <option value="AZ">Arizona</option>
          <option value="AR">Arkansas</option>
          <option value="CA">California</option>
          <option value="CO">Colorado</option>
          <option value="CT">Connecticut</option>
          <option value="DE">Delaware</option>
          <option value="DC">District Of Columbia</option>
          <option value="FL">Florida</option>
          <option value="GA">Georgia</option>
          <option value="HI">Hawaii</option>
          <option value="ID">Idaho</option>
          <option value="IL">Illinois</option>
          <option value="IN">Indiana</option>
          <option value="IA">Iowa</option>
          <option value="KS">Kansas</option>
          <option value="KY">Kentucky</option>
          <option value="LA">Louisiana</option>
          <option value="ME">Maine</option>
          <option value="MD">Maryland</option>
          <option value="MA">Massachusetts</option>
          <option value="MI">Michigan</option>
          <option value="MN">Minnesota</option>
          <option value="MS">Mississippi</option>
          <option value="MO">Missouri</option>
          <option value="MT">Montana</option>
          <option value="NE">Nebraska</option>
          <option value="NV">Nevada</option>
          <option value="NH">New Hampshire</option>
          <option value="NJ">New Jersey</option>
          <option value="NM">New Mexico</option>
          <option value="NY">New York</option>
          <option value="NC">North Carolina</option>
          <option value="ND">North Dakota</option>
          <option value="OH">Ohio</option>
          <option value="OK">Oklahoma</option>
          <option value="OR">Oregon</option>
          <option value="PA">Pennsylvania</option>
          <option value="RI">Rhode Island</option>
          <option value="SC">South Carolina</option>
          <option value="SD">South Dakota</option>
          <option value="TN">Tennessee</option>
          <option value="TX">Texas</option>
          <option value="UT">Utah</option>
          <option value="VT">Vermont</option>
          <option value="VA">Virginia</option>
          <option value="WA">Washington</option>
          <option value="WV">West Virginia</option>
          <option value="WI">Wisconsin</option>
          <option value="WY">Wyoming</option>
        </select>

        <label htmlFor="funFactPost">Fun Fact :</label>
        <textarea
          id="funFactPost"
          required
          value={postFunFact}
          onChange={(e) => setPostFunFact(e.target.value)}
        />
        <button type="submit"> Submit</button>
      </form>
    </main>
  );
};

export default ContributePage;
