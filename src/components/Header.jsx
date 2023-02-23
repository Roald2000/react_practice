
import { Link } from 'react-router-dom';

const HeaderNav = () => {
    return (
        <nav>
            <ul className='flex justify-start items-center gap-2'>
                <li><Link className='p-1 rounded-md bg-white text-orange-600  active:shadow-inner active:shadow-orange-900' to={'/'}>Products</Link></li>
                <li><Link className='p-1 rounded-md bg-white text-orange-600  active:shadow-inner active:shadow-orange-900' to={'/new_product'}>New Products</Link></li>
                <li><Link className='p-1 rounded-md bg-white text-orange-600  active:shadow-inner active:shadow-orange-900' to={'/buy_product'}>Buy Products</Link></li>
            </ul>
        </nav>
    )
}

const Header = () => {
    return (
        <header className='flex justify-between items-center bg-orange-400 px-5 py-3'>
            <HeaderNav />
            <button className='p-1 rounded-md bg-[crimson] text-white' type='button'>Logout</button>
        </header>
    )
}

export default Header;