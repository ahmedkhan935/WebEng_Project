
import React from 'react';
import { Navbar, Button } from 'react-daisyui';

function NavBar({props}) {
    return (
        <Navbar { ...props } >
        <div className="flex-none">
          <Button shape="square" color="ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
        <div className="flex-1">
          <Button tag="a" color="ghost" className="normal-case text-xl">
            CleanSlate
          </Button>
        </div>
        <div className="flex-none">
          <Button shape="square" color="ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </Button>
        </div>
      </Navbar>
    )
}

export default NavBar;