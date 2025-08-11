import './Framework.css'
import Hello from '@scenario/hello'
import TabBar from './components/tabBar/tabBar'
import IconBar from './components/iconBar/iconBar'
import React, { useCallback, useState } from 'react'
import { IconBarClickHandlers } from './components/iconBar/types'
import ResourceTreeComponent from './components/resourceScene/resourceTreeComponent'

export default function Framework() {

	const [activeIconID, setActiveIconID] = useState('grid-editor')

	const [resourceTreeWidth, setResourceTreeWidth] = useState(216) // default 200px
    const [screenWidth, setScreenWidth] = useState(1600) 

	const [isResizing, setIsResizing] = useState(false)
	const [isResourceTreeCollapsed, setIsResourceTreeCollapsed] = useState(false)

	const iconBarWidth = 40
	const actualResourceTreeWidth = isResourceTreeCollapsed ? 0 : resourceTreeWidth
	const viewportWidth = screenWidth - iconBarWidth - actualResourceTreeWidth

	const iconClickHandlers: IconBarClickHandlers = {}

	// Handle mouse down for resizing
	const handleMouseDown = useCallback((e: React.MouseEvent) => {
		setIsResizing(true)
		e.preventDefault()
		// Add visual feedback for better UX
		document.body.classList.add('resizing')
	}, [])

	return (
		<div className='flex h-screen w-screen overflow-auto bg-black'>
			<IconBar
				currentActiveId={activeIconID}
				clickHandlers={iconClickHandlers}
			/>

			<div
				className='relative flex-shrink-0'
				style={{ width: `${resourceTreeWidth}px` }}
			>
				<ResourceTreeComponent />
				{/* Resize Handle */}
				<div
					className={`absolute top-0 right-0 w-1 h-full cursor-col-resize transition-all duration-200 ${isResizing ? 'bg-blue-500 w-1' : 'bg-transparent hover:bg-blue-400'}`}
					onMouseDown={handleMouseDown}
				>
				</div>
			</div>

			{/* Main Content Area */}
			<div className='flex flex-col flex-1 h-full overflow-hidden'>
				{/* Fixed TabBar - no horizontal scroll */}
				<TabBar width={viewportWidth} />

				{/* Hello Page */}
				<Hello />
			</div>
		</div>
	)
}
