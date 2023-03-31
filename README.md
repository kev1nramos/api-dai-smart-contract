# tessera-senior-backend-coding-challenge

## Basic

```
try {
    const database = await connectToDatabase();
    const user = await getUser(database, 'email@email.com');
    const settings = await getUserSettings(database, user.id);
    const success = await setRole(database, user.id, ADMIN);
    if (success) {
      await notifyUser(user.id, USER_ROLE_UPDATED);
      await notifyAdmins(USER_ROLE_UPDATED);
    }
  } catch (error) {
    // handle errors
  }
```
