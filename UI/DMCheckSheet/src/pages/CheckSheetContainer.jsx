import { useParams } from "react-router-dom";
import { StatusProvider } from "../contexts/StatusContext";
import CheckSheet from "./CheckSheet";

export default function CheckSheetContainer() {
  return <CheckSheet />;
}
