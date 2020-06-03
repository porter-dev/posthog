import React, { useState } from 'react'
import { CaretDownOutlined } from '@ant-design/icons'

export function Dropdown({ className, style, 'data-attr': dataAttr, buttonStyle, children, buttonClassName, title }) {
    const [menuOpen, setMenuOpen] = useState(false)

    function close(e) {
        if (e.target.closest('.dropdown-no-close') || e.target.closest('.react-datepicker')) return
        setMenuOpen(false)
        document.removeEventListener('click', close)
    }

    function open(e) {
        e.preventDefault()
        setMenuOpen(true)
        document.addEventListener('click', close)
    }

    return (
        <div
            className={'dropdown ' + className}
            style={{
                display: 'inline',
                marginTop: -6,
                ...style,
            }}
            data-attr={dataAttr}
        >
            <a className={'cursor-pointer ' + buttonClassName} style={{ ...buttonStyle }} onClick={open} href="#">
                <CaretDownOutlined />
                {title || <span>&hellip;</span>}
            </a>
            <div
                className={'dropdown-menu ' + (menuOpen && 'show')}
                style={{
                    borderRadius: 2,
                }}
                aria-labelledby="dropdownMenuButton"
            >
                {children}
            </div>
        </div>
    )
}
