# Invite code challenge

The task of this code challenge is to send an invitation to each of the users from the list (located in `invite.component.ts`).
You need to make api call sequentially for each email and to display the collected results info afterwards on `invite-list.component.html`.

The error messages should be displayed individually with the information on the error content (e.g. _user1@comtravo.com already exists_). 
Successful invitations should all be given in the form of their total number (e.g. _5 users successfully invited_).

## Development server

Run `npm run start:all` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## List of changes

### InviteService
- Error handling.
- Methods for cross-components communication.

### InviteListComponent
- Subscribe to InviteService to get list of errors and number of successful invitations.
- Rendering results.

### InviteComponent
- Sequential calls of the API (InviteService).
- Redirect to `invet-list` page once the last email is sent.

### Routing update
- Redirect for unknown urls to InviteComponent.

### Unit Tests
- Fixing of existing unit tests.
- New unit test for InviteListComponent to test communication with InviteService.

## Areas for improvements
- Cover all code paths by unit tests.
- UI improvements.
