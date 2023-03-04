import React from "react";
import Button from "../../ui/Button";
import classes from "./Nav.module.css";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Avatar from "./Avatar";
function Nav() {
  const { data: session } = useSession();

  return (
    <nav className={classes.nav}>
      <div>
        <Link href="/" passHref>
          <a>
            <div className={classes.logo}>
              <div className="css-1vs2kf0">
                <div style={{ transform: "scale(.4)" }}>
                  <svg
                    width="512.6400146484375"
                    height="170.8800048828125"
                    viewBox="0 0 270 90"
                    className="css-1j8o68f">
                    <defs id="SvgjsDefs2515">
                      <linearGradient id="SvgjsLinearGradient2522">
                        <stop
                          id="SvgjsStop2523"
                          stopColor="#7f00ff"
                          offset="0"></stop>
                        <stop
                          id="SvgjsStop2524"
                          stopColor="#e100ff"
                          offset="1"></stop>
                      </linearGradient>
                    </defs>
                    <g
                      id="SvgjsG2516"
                      featurekey="symbolContainer"
                      transform="matrix(1,0,0,1,0,0)"
                      fill="#000000">
                      <rect width="100" height="90" rx="8"></rect>
                    </g>
                    <g
                      id="SvgjsG2517"
                      featurekey="symbolFeature-0"
                      transform="matrix(0.7228909017807358,0,0,0.7228909017807358,13.494006702462896,8.494006702462896)"
                      fill="#f3f6f6">
                      <title xmlns="http://www.w3.org/2000/svg">
                        Artboard 16
                      </title>
                      <path
                        xmlns="http://www.w3.org/2000/svg"
                        d="M14,37V48.59A4.37,4.37,0,0,0,18.62,53H22a1,1,0,0,0,0-2H18.62A2.36,2.36,0,0,1,16,48.59V37h9v7a1,1,0,0,0,2,0V37h4.68A5.31,5.31,0,0,0,37,32H48.78C51.25,32,54,30.07,54,27.29V24a1,1,0,0,0-2,0v3.29C52,28.82,50.27,30,48.78,30H37V21h7a1,1,0,0,0,0-2H37V14.32A5.33,5.33,0,0,0,31.68,9H14.32A5.33,5.33,0,0,0,9,14.32V31.68A5.31,5.31,0,0,0,14,37ZM11,14.32A3.33,3.33,0,0,1,14.32,11H31.68A3.33,3.33,0,0,1,35,14.32V31.68A3.33,3.33,0,0,1,31.68,35H14.32A3.33,3.33,0,0,1,11,31.68Z"></path>
                      <path
                        xmlns="http://www.w3.org/2000/svg"
                        d="M86.68,9H69.32A5.31,5.31,0,0,0,64,14H51.81C49,14,47,15.82,47,18.33V22a1,1,0,0,0,2,0V18.33C49,16.72,50.41,16,51.81,16H64v9H56a1,1,0,0,0,0,2h8v4.68a5.32,5.32,0,0,0,4,5.15A1,1,0,0,0,68,37V48.7c0,2.45,2.15,4.3,5,4.3h3a1,1,0,0,0,0-2H73c-1.49,0-3-.79-3-2.3V37h9v7a1,1,0,0,0,2,0V37h5.68A5.33,5.33,0,0,0,92,31.68V14.32A5.33,5.33,0,0,0,86.68,9ZM90,31.68A3.33,3.33,0,0,1,86.68,35H69.32A3.33,3.33,0,0,1,66,31.68V14.32A3.33,3.33,0,0,1,69.32,11H86.68A3.33,3.33,0,0,1,90,14.32Z"></path>
                      <path
                        xmlns="http://www.w3.org/2000/svg"
                        d="M87,64s0,0,0,0V51.73A5,5,0,0,0,82,47H78a1,1,0,0,0,0,2h4a3,3,0,0,1,3,2.73V64H76V56a1,1,0,0,0-2,0v8H69.32a5.32,5.32,0,0,0-5.15,4A1,1,0,0,0,64,68H51.81A4.93,4.93,0,0,0,47,72.92V76a1,1,0,0,0,2,0V72.92A2.94,2.94,0,0,1,51.81,70H64v9H56a1,1,0,0,0,0,2h8v5.68A5.33,5.33,0,0,0,69.32,92H86.68A5.33,5.33,0,0,0,92,86.68V69.32A5.31,5.31,0,0,0,87,64Zm3,22.65A3.33,3.33,0,0,1,86.68,90H69.32A3.33,3.33,0,0,1,66,86.68V69.32A3.33,3.33,0,0,1,69.32,66H86.68A3.33,3.33,0,0,1,90,69.32Z"></path>
                      <path
                        xmlns="http://www.w3.org/2000/svg"
                        d="M53,77a1,1,0,0,0-1,1v3.88A3.54,3.54,0,0,1,48.78,85H37V76h7a1,1,0,0,0,0-2H37V69.32A5.31,5.31,0,0,0,32,64s0,0,0,0V51.62A4.37,4.37,0,0,0,27.58,47H24a1,1,0,0,0,0,2h3.58A2.37,2.37,0,0,1,30,51.62V64H21V56a1,1,0,0,0-2,0v8H14.32A5.33,5.33,0,0,0,9,69.32V86.68A5.33,5.33,0,0,0,14.32,92H31.68A5.31,5.31,0,0,0,37,87H48.78A5.53,5.53,0,0,0,54,81.88V78A1,1,0,0,0,53,77ZM35,86.68A3.33,3.33,0,0,1,31.68,90H14.32A3.33,3.33,0,0,1,11,86.68V69.32A3.33,3.33,0,0,1,14.32,66H31.68A3.33,3.33,0,0,1,35,69.32Z"></path>
                      <circle
                        xmlns="http://www.w3.org/2000/svg"
                        cx="50"
                        cy="42.7"
                        r="5.78"></circle>
                      <path
                        xmlns="http://www.w3.org/2000/svg"
                        d="M40,56.51V63H60V56.51C60,53.1,57.6,50,54.19,50H45.81C42.4,50,40,53.1,40,56.51Z"></path>
                    </g>
                    <g
                      id="SvgjsG2518"
                      featurekey="nameFeature-0"
                      transform="matrix(2.6416447076009093,0,0,2.6416447076009093,117.30446687504266,-22.110341416670117)"
                      fill="url(#SvgjsLinearGradient2522)">
                      <path d="M5.924 37.7188 c-0.22922 0 -0.458 -0.07 -0.7016 -0.21078 l-3.5008 -2.0276 c-0.4868 -0.27762 -0.7012 -0.6492 -0.7012 -1.2116 l0 -17.517 c0 -0.5624 0.21442 -0.934 0.7012 -1.2156 l7.5612 -4.3704 c0.15359 -0.092384 0.3332 -0.14559 0.5252 -0.14559 c0.5632 0 1.02 0.4568 1.02 1.02 c0 0.38398 -0.21238 0.7184 -0.52596 0.8924 l-7.2416 4.186 l0 16.783 l2.864 1.6556 l7.2424 -4.1864 c0.15359 -0.092384 0.3332 -0.14559 0.5252 -0.14559 c0.5632 0 1.02 0.4568 1.02 1.02 c0 0.38398 -0.21238 0.7184 -0.52596 0.8924 l-7.56 4.37 c-0.24359 0.14078 -0.4728 0.21117 -0.70204 0.21117 z M9.8084 40.00039062 c-0.5632 0 -1.0208 -0.45796 -1.0208 -1.0212 c0 -0.38398 0.21238 -0.7184 0.52596 -0.8924 l7.2416 -4.186 l0 -3.3128 l-2.864 -1.6552 l-3.3588 1.9416 c-0.1532 0.092384 -0.33281 0.14559 -0.5248 0.14559 c-0.5632 0 -1.02 -0.4568 -1.02 -1.02 c0 -0.38398 0.21238 -0.7184 0.52596 -0.8924 l3.676 -2.1248 c0.24359 -0.14078 0.4728 -0.21117 0.70204 -0.21117 s0.45844 0.070392 0.70204 0.21117 l3.5008 2.0236 c0.4872 0.2816 0.7016 0.6532 0.7016 1.2156 l0 4.0468 c0 0.5624 -0.21442 0.934 -0.7012 1.2116 l-7.5612 4.3744 c-0.15359 0.092384 -0.3332 0.14559 -0.5252 0.14559 z M5.9236 33.264 c-0.5632 0 -1.02 -0.45684 -1.02 -1.02 l0 -4.2684 c0 -0.5624 0.21442 -0.934 0.7012 -1.2156 l7.5612 -4.3704 c0.15359 -0.092384 0.3332 -0.14559 0.5252 -0.14559 c0.5632 0 1.02 0.4568 1.02 1.02 c0 0.38398 -0.21238 0.7184 -0.52596 0.8924 l-7.2416 4.186 l0 3.9016 c0 0.5632 -0.4568 1.02 -1.02 1.02 z M5.9236 24.284 c-0.5632 0 -1.0205 -0.45724 -1.0205 -1.0204 l0 -4.2684 c0 -0.5624 0.21442 -0.934 0.7012 -1.2156 l7.3844 -4.2684 c0.24359 -0.14078 0.4728 -0.21117 0.70204 -0.21117 s0.45844 0.070392 0.70204 0.21117 l3.5008 2.0236 c0.4872 0.2816 0.7024 0.6532 0.702 1.2156 l-0.004414 4.2688 c0 0.6728 -0.5892 1.0208 -1.022 1.0208 c-0.1732 0 -0.3484 -0.043984 -0.50916 -0.1368 l-3.3692 -1.9512 l-3.3588 1.9412 c-0.1532 0.092384 -0.33281 0.14559 -0.5248 0.14559 c-0.5632 0 -1.02 -0.4568 -1.02 -1.02 c0 -0.38398 0.21238 -0.7184 0.52596 -0.8924 l3.676 -2.1248 c0.24359 -0.14078 0.4728 -0.21117 0.70204 -0.21117 s0.45844 0.070392 0.70204 0.21117 l2.162 1.2496 l0 -2.1336 l-2.864 -1.6556 l-6.7476 3.9004 l0 3.9016 c0 0.5632 -0.4568 1.02 -1.02 1.02 z M26.2256 39.75238 c-0.24359 0.14078 -0.47196 0.21156 -0.70116 0.21156 s-0.45844 -0.070392 -0.70204 -0.21117 l-3.5008 -2.0236 c-0.4868 -0.2816 -0.7012 -0.6532 -0.7012 -1.2156 l0 -22.007 c0 -0.5624 0.21442 -0.934 0.7012 -1.2156 l3.6772 -2.1256 c0.15359 -0.092384 0.3332 -0.14559 0.5252 -0.14559 c0.5632 0 1.02 0.4568 1.02 1.02 c0 0.38398 -0.21238 0.7184 -0.52596 0.8924 l-3.358 1.9408 l0 21.273 l2.864 1.6556 l10.632 -6.1456 l0 -19.616 c0 -0.5632 0.4568 -1.02 1.02 -1.02 s1.02 0.4568 1.02 1.02 l0 19.984 c0 0.5624 -0.21442 0.934 -0.7016 1.2156 z M25.524800000000003 35.5104 c-0.5632 0 -1.02 -0.4568 -1.02 -1.02 l0 -17.96 c0 -0.5632 0.4568 -1.02 1.02 -1.02 s1.02 0.4568 1.02 1.02 l0 17.96 c0 0.5632 -0.4568 1.02 -1.02 1.02 z M29.4088 33.2652 c-0.5632 0 -1.0208 -0.4576 -1.0208 -1.0208 c0 -0.38398 0.21238 -0.7184 0.52596 -0.8924 l3.358 -1.9408 l0 -15.126 c0 -0.5632 0.4568 -1.02 1.02 -1.02 s1.02 0.4568 1.02 1.02 l0 15.494 c0 0.5624 -0.21442 0.934 -0.7012 1.2156 l-3.6772 2.1256 c-0.1532 0.092384 -0.33281 0.14559 -0.5248 0.14559 z M45.128800000000005 30.9836 c-0.22922 0 -0.4576 -0.06922 -0.70116 -0.21 l-3.5008 -2.0236 c-0.4868 -0.2816 -0.7012 -0.6532 -0.7012 -1.2156 l0 -13.027 c0 -0.5624 0.21442 -0.934 0.7012 -1.2156 l3.6772 -2.1256 c0.15359 -0.092384 0.3332 -0.14559 0.5252 -0.14559 c0.5632 0 1.02 0.4568 1.02 1.02 c0 0.38398 -0.21238 0.7184 -0.52596 0.8924 l-3.358 1.9408 l0 12.293 l2.864 1.6552 l7.2424 -4.1864 c0.15359 -0.092384 0.3332 -0.14559 0.5252 -0.14559 c0.5632 0 1.02 0.4568 1.02 1.02 c0 0.38398 -0.21238 0.7184 -0.52596 0.8924 l-7.56 4.37 c-0.24359 0.14078 -0.4728 0.21117 -0.70204 0.21117 z M45.1296 39.964766 l0.0021484 0.00039062 c-0.22922 0 -0.45844 -0.070392 -0.70204 -0.21117 l-3.5008 -2.0236 c-0.4868 -0.2816 -0.7004 -0.6532 -0.70116 -1.2156 l-0.0048048 -4.2724 c0 -0.5504 0.4572 -1.0148 1.0192 -1.0148 c0.1732 0 0.3484 0.043984 0.50916 0.1368 l3.3784 1.9492 l3.3588 -1.9416 c0.15359 -0.092384 0.3332 -0.14559 0.5252 -0.14559 c0.5632 0 1.02 0.4568 1.02 1.02 c0 0.38398 -0.21238 0.7184 -0.52596 0.8924 l-3.676 2.1248 c-0.24359 0.14078 -0.4728 0.21117 -0.70204 0.21117 s-0.45844 -0.070392 -0.70204 -0.21117 l-2.162 -1.2496 l0 2.1336 l2.864 1.6556 l6.7476 -3.9004 l0 -3.9016 c0 -0.5632 0.4568 -1.02 1.02 -1.02 s1.02 0.4568 1.02 1.02 l0 4.2684 c0 0.5624 -0.21442 0.934 -0.7012 1.2116 l-7.3844 4.2724 c-0.24359 0.14078 -0.4728 0.21117 -0.70204 0.21117 z M52.900000000000006 40.0015625 c-0.5632 0 -1.0216 -0.45796 -1.0216 -1.0212 c0 -0.38398 0.21238 -0.7184 0.52596 -0.8924 l3.358 -1.9408 l0 -12.293 l-2.864 -1.6552 l-3.3588 1.9412 c-0.1532 0.092384 -0.33281 0.14559 -0.5248 0.14559 c-0.5632 0 -1.02 -0.4568 -1.02 -1.02 c0 -0.38398 0.21238 -0.7184 0.52596 -0.8924 l3.676 -2.1248 c0.24359 -0.14078 0.4728 -0.21117 0.70204 -0.21117 s0.45844 0.070392 0.70204 0.21117 l3.5008 2.0236 c0.4872 0.2816 0.7016 0.6532 0.7016 1.2156 l0 13.027 c0 0.5624 -0.21442 0.934 -0.7012 1.2156 l-3.6772 2.1256 c-0.1532 0.092384 -0.33281 0.14559 -0.5248 0.14559 z M45.13 26.53 c-0.5632 0 -1.0213 -0.45724 -1.0213 -1.0204 l0 -4.2684 c0 -0.5624 0.21442 -0.934 0.7012 -1.2156 l7.3844 -4.2684 c0.24359 -0.14078 0.4728 -0.21117 0.70204 -0.21117 s0.45844 0.070392 0.70204 0.21117 l2.162 1.2496 l0 -2.1336 l-2.864 -1.6556 l-7.2424 4.1864 c-0.15359 0.092384 -0.3332 0.14559 -0.5252 0.14559 c-0.5632 0 -1.02 -0.4568 -1.02 -1.02 c0 -0.38398 0.21238 -0.7184 0.52596 -0.8924 l7.56 -4.37 c0.24359 -0.14078 0.4728 -0.21117 0.70204 -0.21117 s0.45844 0.070392 0.70204 0.21117 l3.5008 2.0236 c0.4872 0.2816 0.7016 0.6532 0.7016 1.2156 l0 4.6248 c0 0.5688 -0.2532 0.88596 -0.6464 0.88596 c-0.16879 0 -0.36359 -0.0584 -0.5752 -0.18078 l-3.682 -2.1284 l-6.7476 3.9004 l0 3.9016 c0 0.5632 -0.4568 1.02 -1.02 1.02 z"></path>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </a>
        </Link>
      </div>
      {!session && (
        <div className={classes.btn}>
          <Link href="/signin" passHref>
            <a>
              <Button>Sign in</Button>
            </a>
          </Link>
        </div>
      )}
      {session && (
        <div className={classes.btn}>
          <Avatar
            backgroundColor={"#000"}
            fontSize="2rem"
            border="solid 5px white"
            px="50px"
            py="50px"
            color={"white"}
            borderRadius="50%">
            {" " + session?.user?.email?.charAt(0).toUpperCase() + " "}
          </Avatar>

          <Link href="/signin" passHref>
            <a>
              <Button onClick={() => signOut()}>Sign Out</Button>
            </a>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Nav;
