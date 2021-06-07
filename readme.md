1: Clone project
git clone this project

2: Start asset server
npx http-server -c-1 --cors -p 7071 ./svg & npx http-server -c-1 --cors -p 7070 ./

3: Build by Parcel
parcel index.html





Marker:

Page@(Number)
::PageNext()
::PagePrev()
::NavHideAt( number )
::NavShowAt( number )
::NavAtRange( number, number )


pageConfiguration
pageConfiguration::transitionMode::topDownScroll
pageConfiguration::transitionMode::fade
pageConfiguration::transition::ease*0.4


Interactive 
in::( name )
::AddClickHide( name, toggle? )
::AddClickShow( name, toggle? )
::AddClickMove( name, x, y, r, toggle? )
::PlayOnShow()
::PlayOnMove( x, y, r )


Transition Setup
::transition=linear*0.5


Audio
audio::bgm::path
audio::basic::path
audio::name::path 


GameSet()
- RadiationDrag
- ConnectLine
- DragSlot 
- Mc
- Comparing