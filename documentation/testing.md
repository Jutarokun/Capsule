# Testprotokoll

## Testfälle Capsule

| Testfall Nr.        | 1                                                                                    |
| ------------------- | ------------------------------------------------------------------------------------ |
| Beschreibung        | Registration von einem User, wlcher noch kein Konto hat.                             |
| Voraussetzungen     | Applikation ist am laufen und der Client ist im gleichen Subnetz                     |
| Testschritte        | 1. Einen username eingeben<br />2. Eine Email eingeben<br />3. Ein Passwort eingeben |
| erwartetes Ergebnis | Account hat sich erstellt.                                                           |
| Testergebnis        | erfüllt                                                                             |
| Testdatum           | 28.06.2023                                                                           |
| Bemerkungen         |                                                                                      |

| Testfall Nr.        | 2                                                                                                                                                                                                                                                    |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Beschreibung        | Registrierender Nutzer gibt Daten an, welche schon verwendet wurden.                                                                                                                                                                                 |
| Voraussetzungen     | Applikation ist am laufen und der Client ist im gleichen Subnetz.                                                                                                                                                                                    |
| Testschritte        | 1. Einen Usernamen eingeben, welcher schon verwendet wurde<br />2. Eine Email eingeben, welche schon verwendet wurde                                                                                                                                 |
| erwartetes Ergebnis | User wird darauf aufmerksam gemacht, dass diese Daten schon einmal verwendet wurde                                                                                                                                                                   |
| Testergebnis        | erfüllt                                                                                                                                                                                                                                             |
| Testdatum           | 28.06.2023                                                                                                                                                                                                                                           |
| Bemerkungen         | Wenn man beides falsch eingibt, dann wird nur das erste genommen also wenn man einen username und eine email<br />eingibt, welche schon vergeben ist, dann wird nur das erste genommen und es wird gesagt, dass der username schon<br />vergeben ist |

| Testfall Nr.        | 3                                                                                                                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Beschreibung        | Wenn sich ein User registriert hat, dann sollte er sich mit den gleichen Daten wieder einloggen können                                                                        |
| Voraussetzungen     | Applikation ist am laufen und der Client ist im gleichen Subnetz.                                                                                                              |
| Testschritte        | 1. Erstellen eines Users mit den Daten { username:`testLogin`, email: `testLogin@testLogin.ch`, password: `test1234` }.<br />2. Ein login mit diesen User Daten machen. |
| erwartetes Ergebnis | Man sollte danach mit einem voll funktionierenden Token auf der Main Page landen.                                                                                              |
| Testergebnis        | erfüllt                                                                                                                                                                       |
| Testdatum           | 28.06.2023                                                                                                                                                                     |
| Bemerkungen         |                                                                                                                                                                                |

| Testfall Nr.        | 4                                                                                                                                                                            |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Beschreibung        | Wenn man Search geht und dann Search all klickt, dann sollten alle Capsules / Rooms angezeigt werden, in<br />welchen man noch nicht drinnen ist oder man nicht gebannt ist. |
| Voraussetzungen     | Applikation ist am laufen, der Client ist im gleichen Subnetz, eingelogged, schon mehrerere Capsules / Rooms<br />existieren.                                               |
| Testschritte        | 1. Auf Search gehen.<br />2. Search all Button anklicken.<br />3. Mit dem Join button einer Capsule / einem Room joinen                                                      |
| erwartetes Ergebnis | Man sollte auf die Main page weitergeleitet werden und da soll die Capsule / dieser Room angezeigt werden.                                                                   |
| Testergebnis        | erfüllt                                                                                                                                                                     |
| Testdatum           | 28.06.2023                                                                                                                                                                   |
| Bemerkungen         |                                                                                                                                                                              |

| Testfall Nr.        | 5                                                                                                                                                                                                                                 |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Beschreibung        | Wenn man ein Search Kriterium auswählt und dann etwas in der Box eingibt sollten Ergebnisse angezeigt werden,<br />welche dieses Wort oder Satz haben oder beinhalten.                                                           |
| Voraussetzungen     | Applikation ist am laufen, der Client ist im gleichen Subnetz, eingelogged, schon mehrerere Capsules / Rooms existieren.                                                                                                         |
| Testschritte        | 1. Links in dem Dropdown `capsule name` auswählen.<br />2. Das Wort `test` eingeben.<br />3. Auf suchen klicken.<br />4. capsule description auswählen.<br />5. Das wort `puroses` eingeben.<br />6. Auf suchen klicken. |
| erwartetes Ergebnis | Beim ersten mal suchen sollten Capsules auftauchen, welche das wort test als Name haben oder beinhalten. Beim zweiten mal<br />sollten Capsules angezeigt werden, welche das Wort purposes beinhalten oder als Description haben. |
| Testergebnis        | erfüllt                                                                                                                                                                                                                          |
| Testdatum           | 28.06.2023                                                                                                                                                                                                                        |
| Bemerkungen         |                                                                                                                                                                                                                                   |

| Testfall Nr.        | 6                                                                                                                                             |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Beschreibung        | Wenn man sich auslogged und dann wieder einlogged, dann sollten die Capsules / Rooms, welchen man gejoined ist immernoch<br />vorhanden sein. |
| Voraussetzungen     | Applikation ist am laufen, der Client ist im gleichen Subnetz, eingelogged, schon mehrereren Capsules / Rooms gejoined.                      |
| Testschritte        | 1. Sich ausloggen<br />2. Sich einloggen                                                                                                      |
| erwartetes Ergebnis | Rooms sollten immernoch da sein und man kann mit ihnen interagieren.                                                                          |
| Testergebnis        | erfüllt                                                                                                                                      |
| Testdatum           | 28.06.2023                                                                                                                                    |
| Bemerkungen         |                                                                                                                                               |

| Testfall Nr.        | 7                                                                                                                                                                                 |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Beschreibung        | Wenn man auf das kreuz oben rechts an dem Container klickt, dann sollte der Roomverschwinden und man ist nicht mehr<br />in diesem drinnen. Auch sollte er nicht mehr auftauchen. |
| Voraussetzungen     | Applikation ist am laufen, der Client ist im gleichen Subnetz, eingelogged, schon mehrerere Capsules / Rooms existieren, user ist in Rooms<br />/ Capsules gejoinded.            |
| Testschritte        | 1. Das kreuz drücken                                                                                                                                                             |
| erwartetes Ergebnis | Der Room sollte verschwinden und dann nicht mehr auftauchen.                                                                                                                      |
| Testergebnis        | erfüllt                                                                                                                                                                          |
| Testdatum           | 28.06.2023                                                                                                                                                                        |
| Bemerkungen         |                                                                                                                                                                                   |

| Testfall Nr.        | 8                                                                                                                                                                       |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Beschreibung        | Das erstellen einer Capsule mit dem Namen:`testingCreation` und der Description: `testing`                                                                          |
| Voraussetzungen     | Applikation ist am laufen, der Client ist im gleichen Subnetz, eingelogged.                                                                                            |
| Testschritte        | 1. Zu create Capsules navigieren.<br />2. Den Namen `testingCreation` eingeben.<br />3. Die Description: `testing` eingeben.<br />4. Dann auf Add Capsule drücken. |
| erwartetes Ergebnis | Wenn man nun auf change capsules oder home geht, dann sollte man die Capsule sehen und man sollte auch reinschreiben können                                            |
| Testergebnis        | erfüllt                                                                                                                                                                |
| Testdatum           | 28.06.2023                                                                                                                                                              |
| Bemerkungen         |                                                                                                                                                                         |

| Testfall Nr.        | 9                                                                                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Beschreibung        | Eine Capsule erstellen mit einem Namen, welcher schon von einer anderen Capsule genutzt wird.                                                                      |
| Voraussetzungen     | Applikation ist am laufen, der Client ist im gleichen Subnetz, eingelogged, capsule mti dem Namen `dsa` existiert bereits.                                      |
| Testschritte        | 1. Zu create Capsules navigieren.<br />2. Einen Capsule Namen eingeben, welcher schon existiert in dem Fall ist es `dsa`.<br />3. Dann auf Add Capsule drücken. |
| erwartetes Ergebnis | Man wird darauf hingewiesen, dass der Name schon existiert.                                                                                                        |
| Testergebnis        | erfüllt                                                                                                                                                           |
| Testdatum           | 28.06.2023                                                                                                                                                         |
| Bemerkungen         |                                                                                                                                                                    |

| Testfall Nr.        | 10                                                                                                                                                                                 |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Beschreibung        | Den Namen einer Capsule changen, damit sie danch anders benannt ist.                                                                                                               |
| Voraussetzungen     | Capsule existiert bereits, bei welcher man den Namen ändern könnte, der Server ist am laufen.                                                                                    |
| Testschritte        | 1. Zu change Capsules navigieren.<br />2. Bei irgend einer Capsule den Change Capsule button anklicken.<br />3. Einen neuen Namen eingeben.<br />4. Auf den submit button klicken. |
| erwartetes Ergebnis | Der Name der Capsule sollte sich geändert haben und die Beschreibubng sollte gleich bleiben.                                                                                      |
| Testergebnis        | erfüllt                                                                                                                                                                           |
| Testdatum           | 28.06.2023                                                                                                                                                                         |
| Bemerkungen         |                                                                                                                                                                                    |

| Testfall Nr.        | 11                                                                                                                                                                 |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Beschreibung        | Ein Name einer Capsule eingeben, welcher schon vorhanden ist um den Namen der Capsule zu ändern.                                                                  |
| Voraussetzungen     | Capsule existiert bereits, bei welcher man den Namen ändern könnte, eine andere Capsule mit dem gleichen<br />Namen existiert bereits, der Server ist am laufen. |
| Testschritte        | 1. Zu der change Capsules Page navigieren.<br />2. Auf Change Capsule klicken.<br />3. Den Namen auf `dsa` versuchen zu ändern.                                 |
| erwartetes Ergebnis | Der Capsule Name sollte sich nicht ändern.                                                                                                                        |
| Testergebnis        | erfüllt                                                                                                                                                           |
| Testdatum           | 28.06.2023                                                                                                                                                         |
| Bemerkungen         |                                                                                                                                                                    |

| Testfall Nr.        | 12                                                                                                              |
| ------------------- | --------------------------------------------------------------------------------------------------------------- |
| Beschreibung        | Eine andere Beschreibung für die Capsule schreiben.                                                            |
| Voraussetzungen     | Capsule existiert bereits, bei welcher man die Beschreibung ändern könnte, der Server ist am laufen.          |
| Testschritte        | 1. Zu der change Capsule Page navigieren.<br />2. Auf Change Capsule klicken.<br />3. Die Beschreibung ändern. |
| erwartetes Ergebnis | Der Name sollte gleich bleiben aber die Beschreibung sollte sich geändert haben.                               |
| Testergebnis        | erfüllt.                                                                                                       |
| Testdatum           | 28.06.2023                                                                                                      |
| Bemerkungen         |                                                                                                                 |

| Testfall Nr.        | 13                                                                                                                               |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Beschreibung        | Den Namen und die Beschreibung einer Capsule ändern.                                                                            |
| Voraussetzungen     | Capsule existiert bereits, bei welcher man den Namen und die Beschreibung ändern könnte, der Server ist am laufen.            |
| Testschritte        | 1. Zu der change Capsule Page navigieren.<br />2. Auf Change Capsule klicken.<br />3. Die Beschreibung und den Namen ändern. |
| erwartetes Ergebnis | Die Beschreibung und den Namen sollten sich geändert haben.                                                                     |
| Testergebnis        | erfüllt                                                                                                                         |
| Testdatum           | 28.06.2023                                                                                                                       |
| Bemerkungen         |                                                                                                                                  |

| Testfall Nr.        | 14                                                                                                |
| ------------------- | ------------------------------------------------------------------------------------------------- |
| Beschreibung        | Eine Capsule löschen.                                                                            |
| Voraussetzungen     | Capsule existiert bereits, welche man löschen könnte, der Server ist am laufen.                 |
| Testschritte        | 1. Zu der change capsules Page navigieren.<br />2. Auf das kreuz oben rechts an dem Room klicken. |
| erwartetes Ergebnis | Die Capsule sollte gelöscht werden und auch bei anderen Usern nicht mehr angezeigt werden.       |
| Testergebnis        | erfüllt                                                                                          |
| Testdatum           | 28.06.2023                                                                                        |
| Bemerkungen         |                                                                                                   |

| Testfall Nr.        | 15                                                                                                                                                                                                                                                                                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Beschreibung        | Einen user aus der Capsule bannen.                                                                                                                                                                                                                                                                                                                     |
| Voraussetzungen     | Es hat einen anderen user in der Capsule, welcher man bannen könnte, es existiert eine Capsule dafür, der Server ist am laufen.                                                                                                                                                                                                                      |
| Testschritte        | 1. Eine Capsule erstellen.<br />2. Auf einem anderen Browser oder anderem Gerät ein anderer User einloggen.<br />3. Mit dem anderen User dann der Capsule Joinen.<br />4. Auf dem standardgerät, auf welchem sich die Capsule befindet dann den User bannen.<br />5. Beim gebannten User nachschauen, ob man noch mit der Capsule interagieren kann. |
| erwartetes Ergebnis | Man kann mit dem gebannten User nicht mehr mit der Capsule interagieren und bei der Person, auf welchem sich die<br />Capsule befindet sollte der User auf der gebannten Liste angezeigt werden.                                                                                                                                                       |
| Testergebnis        | erfüllt                                                                                                                                                                                                                                                                                                                                               |
| Testdatum           | 28.06.2023                                                                                                                                                                                                                                                                                                                                             |
| Bemerkungen         |                                                                                                                                                                                                                                                                                                                                                        |

| Testfall Nr.        | 16                                                                                                                                                                                                                                                                                                                                                            |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Beschreibung        | Einen user wieder entbannen.                                                                                                                                                                                                                                                                                                                                  |
| Voraussetzungen     | Es hat einen anderen user in der Capsule, welcher man entbannen könnte, es existiert eine Capsule dafür.                                                                                                                                                                                                                                                    |
| Testschritte        | 1. Auf einem anderen Browser oder anderem Gerät ein anderer User einloggen, der Server ist am laufen.<br />2. Mit dem anderen User dann der Capsule Joinen.<br />3. Auf dem standardgerät, auf welchem sich die Capsule befindet dann den User entbannen.<br />4. Beim gebannten User nachschauen, ob man noch mit der Capsule wieder interagieren kann. |
| erwartetes Ergebnis | Der entbannte User sollte jetzt wider mit der Capsule interagieren können.                                                                                                                                                                                                                                                                                   |
| Testergebnis        | erfüllt                                                                                                                                                                                                                                                                                                                                                      |
| Testdatum           | 28.06.2023                                                                                                                                                                                                                                                                                                                                                    |
| Bemerkungen         |                                                                                                                                                                                                                                                                                                                                                               |

| Testfall Nr.        | 17                                                                                                                                                                                      |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Beschreibung        | Account changing                                                                                                                                                                        |
| Voraussetzungen     | Man hat einen account, der Server ist am laufen , man ist eingelogged.                                                                                                                  |
| Testschritte        | 1. Zu der Account page navigieren.<br />2. Die email changen.<br />3. Auf den Submit button klicken.<br />4. Auf den logout button klicken.<br />5. Sich mit der neuen Email einloggen. |
| erwartetes Ergebnis | Man kann isch mit der neuen Email einloggen.                                                                                                                                            |
| Testergebnis        | erfüllt                                                                                                                                                                                |
| Testdatum           | 28.06.2023                                                                                                                                                                              |
| Bemerkungen         |                                                                                                                                                                                         |

| Testfall Nr.        | 18                                                                                                                                                                                           |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Beschreibung        | Sein Passwort ändern.                                                                                                                                                                      |
| Voraussetzungen     | Man hat einen account, der Server ist am laufen , man ist eingelogged.                                                                                                                       |
| Testschritte        | 1. Zu der Account page navigieren.<br />2. Die email changen.<br />3. Auf den Submit button klicken.<br />4. Auf den logout button klicken.<br />5. Sich mit der neuen Email einloggen. |
| erwartetes Ergebnis | Man sollte sich mit dem neuen Passwort einloggen können.                                                                                                                                    |
| Testergebnis        | erfüllt                                                                                                                                                                                     |
| Testdatum           | 28.06.2023                                                                                                                                                                                   |
| Bemerkungen         |                                                                                                                                                                                              |

| Testfall Nr.        | 19                                                                                                                                                                                                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Beschreibung        | Eine Message in einem room versenden.                                                                                                                                                                                                                                    |
| Voraussetzungen     | Man hat einen account, der Server ist am laufen , man ist eingelogged, es gibt eine Capsule um reinzuschreiben.                                                                                                                                                          |
| Testschritte        | 1. Auf der Search page einer Capsule beitreten.<br />2. Auf der main Page bei dieser Capsule auf den Chat button klicken und so beitreten.<br />3. Eine nachricht in die Textbox eingeben.<br />4. Entweder Control Enter drücken oder nur auf den Send button klicken. |
| erwartetes Ergebnis | Die Message wird in den Room gesendet und in der Datenbank abgespeichert.                                                                                                                                                                                                |
| Testergebnis        | erfüllt                                                                                                                                                                                                                                                                 |
| Testdatum           | 28.06.2023                                                                                                                                                                                                                                                               |
| Bemerkungen         |                                                                                                                                                                                                                                                                          |

| Testfall Nr.        | 20                                                                                                                                                                                                                                                                                     |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Beschreibung        | Versuchen eine zu lange Message zu schicken.                                                                                                                                                                                                                                           |
| Voraussetzungen     | Man hat einen account, der Server ist am laufen , man ist eingelogged, es gibt eine Capsule um reinzuschreiben.                                                                                                                                                                        |
| Testschritte        | 1. Auf der Search page einer Capsule beitreten.<br />2. Auf der main Page bei dieser Capsule auf den Chat button klicken und so beitreten.<br />3. Eine zu lange nachricht in die Textbox eingeben.<br />4. Entweder Control Enter drücken oder nur auf den Send button klicken. |
| erwartetes Ergebnis | Wenn man zu lange nachrichten schreibt, dann kann man ab der maximalen anzahl nicht weiterschreieben.                                                                                                                                                                                  |
| Testergebnis        | erfüllt                                                                                                                                                                                                                                                                               |
| Testdatum           | 28.06.2023                                                                                                                                                                                                                                                                             |
| Bemerkungen         |                                                                                                                                                                                                                                                                                        |

| Testfall Nr.        | 21                                                                                                                                                                                                                                                                                   |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Beschreibung        | Versuchen eine Nachricht mit sehr vielen Enters zu schreiben.                                                                                                                                                                                                                        |
| Voraussetzungen     | Man hat einen account, der Server ist am laufen , man ist eingelogged, es gibt eine Capsule um reinzuschreiben.                                                                                                                                                                      |
| Testschritte        | 1. Auf der Search page einer Capsule beitreten.<br />2. Auf der main Page bei dieser Capsule auf den Chat button klicken und so beitreten.<br />3. Eine Nachricht mit sehr vielen Enters eingeben.<br />4. Entweder Control Enter drücken oder nur auf den Send button klicken. |
| erwartetes Ergebnis | Der User wird informiert, dass er eine Nachricht mit weniger enters schreiben soll.                                                                                                                                                                                                  |
| Testergebnis        | erüllt                                                                                                                                                                                                                                                                              |
| Testdatum           | 28.06.2023                                                                                                                                                                                                                                                                           |
| Bemerkungen         |                                                                                                                                                                                                                                                                                      |

| Testfall Nr.        | 22                                                                                                                            |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Beschreibung        | Versuchen sich auszuloggen.                                                                                                   |
| Voraussetzungen     | Man hat einen account, der Server ist am laufen, man ist eingelogged.                                                         |
| Testschritte        | 1. Man navigiert zu der Account Page.<br />2. Auf den logout button klicken.<br />3. Probieren auf die main Page zu  kommen. |
| erwartetes Ergebnis | Es sollte unauthorized stehen, weil der Token entfernt wurde.                                                                 |
| Testergebnis        | erfüllt                                                                                                                      |
| Testdatum           | 28.06.2023                                                                                                                    |
| Bemerkungen         |                                                                                                                               |
