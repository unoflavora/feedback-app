import {Link} from 'react-router-dom'

function Button({url, content}) {
  return (
  <Link to={url}>
    <button className='hover:bg-[#C75AF6] py-3 px-5 md:px-5 text-center text-xs md:text-sm  bg-template-purple text-white rounded-xl'>
      {content}
    </button>
  </Link>
  );
}

export default Button;