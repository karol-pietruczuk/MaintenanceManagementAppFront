import logo from '../../img/logo.svg';
import './LogoHeader.css';

interface Props {
    imageSize?: number;
}

export const LogoHeader = (props: Props) => {
    return (
        <header>
            <img
                src={logo}
                alt="plx logo"
                width={props.imageSize ? props.imageSize : 100}
                height={props.imageSize ? props.imageSize : 100}
            />
            <h1>
                <strong>plx</strong>
            </h1>
            <h2>
                easier work, better work
            </h2>
        </header>
    )
}