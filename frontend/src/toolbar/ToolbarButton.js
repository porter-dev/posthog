import React, { useState } from 'react'
import { Button, Modal } from 'antd'
import { useActions, useValues } from 'kea'
import { useLongPress } from 'lib/hooks/useLongPress'

function Logo(props) {
    return (
        <svg
            fill="none"
            height="1059"
            viewBox="0 0 869 1059"
            width="869"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            {...props}
        >
            <linearGradient id="a">
                <stop offset=".9999" stopColor="#c4c4c4" stopOpacity="0" />
                <stop offset="1" stopColor="#fff" />
            </linearGradient>
            <radialGradient id="b" cx="475" cy="468" gradientUnits="userSpaceOnUse" r="19" xlinkHref="#a" />
            <radialGradient id="c" cx="327.5" cy="468.116" gradientUnits="userSpaceOnUse" r="19" xlinkHref="#a" />
            <g stroke="#fff">
                <path
                    d="m119.122 1009.81-93.8149-71.478 79.1769-69.509-92.484-129.184 92.484-60.985-92.484-154.101 107.122-24.919-65.87-154.102h93.815l-42.583-170.496 119.764 24.919 19.295-130.4948 74.52 69.5098 53.894-121.97 65.87 97.051 66.535-97.051 38.591 109.511 141.055-12.46-53.228 85.904 97.807 34.099-55.225 60.985 134.402 50.493-79.177 67.543 113.775 40.001-85.831 71.477 85.831 91.149-75.185 69.51 89.823 80.002-89.823 76.067 75.185 73.444-85.831 74.1"
                    strokeWidth="15"
                />
                <path d="m125.739 1056.24c-48.3173-303.463-54.3401-910.398 308.107-910.398" strokeWidth="30" />
                <path d="m741.953 1055.59c48.317-303.467 54.34-910.402-308.107-910.402" strokeWidth="30" />
                <path d="m346.861 578.153c1.356 14.825 16.596 44.474 66.71 44.474" strokeWidth="15" />
            </g>
            <path
                d="m515.599 477.433c0 22.395-18.155 40.55-40.549 40.55-22.395 0-40.55-18.155-40.55-40.55s18.155-40.549 40.55-40.549c22.394 0 40.549 18.154 40.549 40.549z"
                fill="url(#b)"
            />
            <path
                d="m494.67 468.277c0 10.836-9.077 19.621-20.274 19.621-11.198 0-20.275-8.785-20.275-19.621s9.077-19.621 20.275-19.621c11.197 0 20.274 8.785 20.274 19.621z"
                fill="url(#b)"
            />
            <path
                d="m368.099 477.55c0 22.394-18.155 40.549-40.549 40.549-22.395 0-40.55-18.155-40.55-40.549 0-22.395 18.155-40.55 40.55-40.55 22.394 0 40.549 18.155 40.549 40.55z"
                fill="url(#c)"
            />
            <path
                d="m347.17 468.393c0 10.836-9.077 19.621-20.274 19.621-11.198 0-20.275-8.785-20.275-19.621s9.077-19.621 20.275-19.621c11.197 0 20.274 8.785 20.274 19.621z"
                fill="url(#c)"
            />
        </svg>
    )
}

export function ToolbarButton({ dockLogic, shadowRef }) {
    const { dock, float, setNextOpenMode } = useActions(dockLogic)
    const { nextOpenMode } = useValues(dockLogic)

    const [showOptions, setShowOptions] = useState(false)
    const longPressEvents = useLongPress(
        clicked => {
            if (clicked) {
                nextOpenMode === 'float' ? float() : dock()
            } else {
                setShowOptions(true)
            }
        },
        { ms: 700, clickMs: 1 }
    )

    return (
        <>
            <Modal
                title="Toolbar Settings"
                visible={showOptions}
                onOk={() => setShowOptions(false)}
                onCancel={() => setShowOptions(false)}
                getContainer={() => shadowRef.current.shadowRoot}
            >
                <p>
                    Open in:{' '}
                    <Button onClick={() => setNextOpenMode('float')} type={nextOpenMode === 'float' ? 'primary' : ''}>
                        Floating Mode
                    </Button>{' '}
                    |{' '}
                    <Button onClick={() => setNextOpenMode('dock')} type={nextOpenMode === 'dock' ? 'primary' : ''}>
                        Docked Mode
                    </Button>{' '}
                    mode
                </p>
            </Modal>

            <div className="floating-toolbar-button" {...longPressEvents}>
                <Logo />
            </div>
        </>
    )
}
