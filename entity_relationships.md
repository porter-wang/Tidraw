# Schema Design (Entity Relationships)

## Description of Tidraw's logic

### Main Entities:

#### User

- Has unique ID, incremented by the DB
- Has first, last name
- Has personal **_Preferences_**

  > See [Tldraw's User Preferences Manager, which works across all different boards by default](https://tldraw.dev/docs/editor#User-preferences)  
  > P.S. Thinking of implementing board-by-board preferences for users, for this to work I need to also update how **_Boards_** works

- Has associated **_Boards_**
- Has associated access to **_Shared Boards_**, maybe shared by themselves or from other **_Users_**

> **At all times, one user is _Admin_** (usually the deployer who uses configuration file to initialize the application and sign-up using hard-coded credentials)

#### Boards

For Each Board:

- Has unique ID, incremented by the DB (regardless of whose Board this is)
- Has a unique field for storing **_Editor State_** (most likely in the form of serialized JSON which are snapshots)
  > see [Tldraw.dev's doc on Persistence Key](https://tldraw.dev/docs/persistence) to work with Tldraw's Editor: get the board also means getting the persistence key and passing that key to the Tldraw Editor Instances
- Has a _Boolean_ state to indicate whether this board has _Collaboration_ going on
  > Collaboration means either shared to/from other users


## TODO: Think about the rest of the design