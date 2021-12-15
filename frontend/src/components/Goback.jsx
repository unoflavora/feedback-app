import { useNavigate } from "react-router-dom";
import {ReactComponent as Back} from '../public/shared/icon-arrow-left.svg'

function Goback() {
  const navigate = useNavigate()
  return (
    <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-3 font-bold ">
        <Back/>
        <p className="hover:border-b-2 border-white">Go Back</p>
    </button>
  );
}

export default Goback;