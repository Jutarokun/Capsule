# Projektdokumentation Capsule

## Tag 1 / 07.06.2023

Heute war der Tag, an diesem wir entscheiden durften, welches Projekt wir machem. Ich habe mir am Anfang stark überlegt, was ich machen soll und wie ich es machen soll. Ich bin aber so auf keine Lösung gekommen, weil ich das beste Projekt machen wollte, welches ich kann. Ich habe mich dann entschieden eine Room basierte Chat App zu machen. Ich hatte aber ein Problem, ich wusste nicht wie ich das genau machen soll. Also habe ich mir mal ein paar Beispiele angeschaut und bin dann auf Socket.io gestossen. Also habe ich mich noch für die Backend Sprache Node JS entschieden und so ist mein Projekt entstanden. Ich habe danach noch ein bisschen umexperimentiert, wie ich alles machen soll, bis ich dann ca nach einer Stunde auf mein Konzept gestossen bin. Dann habe ich den Rest des Tages damit verbracht verschiedenste Dinge zu planen. Zum Beispiel habe ich UML Klassendiagramme erstellt und noch viele weitere Dinge. Jetzt bin ich hier und schreibe meine Dokumentation.

## Tag 2 / 08.06.2023

Heute war ein aufregender Tag, denn ich habe heute meien gesammte Planung gemacht und habe mich dann auf den Weg begeben meine Login und andere Datenbank Dinge zu tun. Ich war mit diesen relativ schnell fertig, nachdem ich verstanden habe, dass die Datenbank funktionen Asynchron sind. Nachdem ist eigentlich alles gut gegangen und ich habe weitere Dinge gemacht, wie zum Beispiel mich den Scokets gewibmet. Ich habe heute auch die Datenbank Funktionen geschrieben, welche für das Inserting der Daten kümmern, wenn man eine Capsule / einen Room erstellt. Das habe ich ganz vergessen, ich habe mein Projektname von RoomWave auf Capsule geändert, weil ich den Namen besser fand und ich denke, dass er es auch ist. Ansonsten traten heute keine grösseren Probleme auf. Ich musste zwar manchmal ein paar Dinge repetieren aber dies war es dann auch schon. Ich denke, dass ich noch früher fertig werde als ich geplant habe und das freut mich, denn dann kann ich mich den Nebenaufgaben wibbmen, welche ich mir gestellt habe. Darunter sind einzerlkomunikation zwischen usern und das Allgemeien Design verbessern.

## Tag 3 / 09.06.2023

Heute war ein sehr aufregender und auch spannender Tag, denn ich habe mich endlich um meine Sockets gekümmert, weil ich gestern schon die meisten Dinge von heute fertig gebracht habe und so kam ich heute dazu die Socket connections zu machen. Bis zum jetzigen Stand kann man verschiedenste Dinge machen wie z.B. eine Capsule erstellen oder ihnen joinen. Bis jetzt geschieht dabei aber nur etwas in der Datenbank. Es klingt nach nicht sehr vielen Dingen aber es war für mich kompliziert und aufwendig diese einzubinden. Vorallem musste ich zuerst die Sockets verstehen aber dies ist nicht das Problem hier. Denn eigentlich ist das Prinzip hinter diesen relativ einfach man kann etwas mit socket.emit('function name', { mögliche Parameter }) schicken und dann mit socket.on('name der zu empfangenden Funktion', (data) => {}) schreibt und wenn man data benutzt und man den Parameter von socket.emit eingibt, hat man zugriff auf die Daten. Dies sieht dann in Verwendung so aus:

![1686322886128](image/documentation/1686322886128.png)

![1686322899286](image/documentation/1686322899286.png)

Ansonsten habe ich auch ganz viele neue Datenbank Funktionen geschrieben, denn die Sockets können ja nicht von alleine in die Datenbank schreiben. Ich hatte heute zum Teil Probleme mit den Values der Datenbank, weil ich die Datenbank Funktionen nicht mit Await entgegengenommen habe, ich habe aber dann ganz schnell herausgefunden wieso und ich konnte gut weiterfahren. Im gesammten kann ich sagen, dass ich heute gut vorangekommen bin und der Tag an sich war sehr spannend und interessant.

## Tag 4 / 14.06.2023

Heute war es dann endlich spannend, denn ich habe mich darum gekümmert, dass man jetzt in den Rooms Chatten kann. Dazu habe ich noch ein paar Bugs behoben, wie z.B. das man redirected wird, wenn man sich versucht einen User zu erstellen und dann es schon jemand mit diesem Usernamen gibt. Ich habe mich auch darum gekümmert, dass einem verschiedenste Dinge auf dem UI angezeigt werden und so habe ich den Tag auch schon Erfolgreich abgeschlossen. Ich habe meine Ziele für den Heutigen Tag erreicht und ich kann aber sagen, dass ich das CSS unbedingt verbessern muss, denn es sieht bis jetzt nicht sehr schön aus und es kann noch einen guten CSS look verdienen. Ansonsten hatte ich heute keine grösseren Probleme, ich habe aber bemerkt, dass ich zwar die Rooms in der Datenbank create aber nicht mit Socket.io also konnte ich nicht wircklich reinschreiben, dass habe ich aber danach gefixxt und jetzt funktioniert alles. Ich habe auch einen neuen API Endpoint Hinzugefügt, damit man auf das Chat UI kommt. Hier ist noch ein Bild, wie mein Chat derzeit aussieht:

![1686755311469](image/documentation/1686755311469.png)

## Tag 5 / 15.06.2023

Heute habe ich eigentlich die meiste Zeit damit verbracht mein CSS aufzubessern, damit man die Webseite endlich mal anschauen kann. Dies hat sehr gut funktioniert, denn sie sieht jetzt relativ schön aus. Ich habe dabei auch gelernt, wie man CSS Button Animationen macht und ich muss sagen, dass dies sehr gut funktioniert und auch nicht allzu schwer ist. Ich hatte heute eigentlich keine grösseren Probleme ausser mit CSS, denn CSS macht meistens was es will und ich finde es nicht sehr interessant. Ansonsten lief der Tag sehr gut und ich würde sagen, dass ich auch produktiv war, denn ich habe sehr viel CSS geschrieben. Sonst war der Tag nicht allzu spannend. Ich habe aber auch noch bemerkt, dass ich noch ein paar Bugfixes machen musste, wie z.B. die Login Bugs oder das ein paar Benachrichtigungen nicht durch kamen oder ich sie schlichtweg vergessen habe. Hier sind noch ein Bilder von meinem neuen CSS:

![1686840604941](image/documentation/1686840604941.png)

## Tag 6 / 16.06.2023

Heute habe ich daran gearbeitet, verschiedenste Quality of Life Updates gemacht, denn es gab noch ein paar Dinge, welche man überarbeitet werden mussten. Darum habe ich dieses gemacht und dann habe ich mich daran gemacht, zu implementieren, dass man seine Kapseln / Räume verändern kann. Dies bedeutet, dass man den Namen und die Beschreibung des Raumes verändern kann. Ich hatte heute keine größeren Probleme und ich konnte gut an den Themen arbeiten. Hier ist noch ein Bild von der Überabarbeitungs-Seite:

![1687265301444](image/documentation/1687265301444.png)

## Tag 7 / 21.06.2023

Heute habe ich verschiedenste kleinere Dinge gemacht, welche ich mir schon länger vorgeschoben habe und so habe ich ein paar Quality of Life Dinge gemacht, wie z.B. dass einem wenn man Capsules sucht nur noch die Capsules angezeigt werden, welchen man noch nicht beigetreten ist. Ich habe auch implementiert, dass man Rooms löschen kann. Ich hatte heute eigentlich keine grösseren Probleme oder Dinge, welche mich grossartig aufgehalten haben. Es war ein durchaus angenehmer Tag und ich konnte die meisten Dinge schon, welche ich heute machen musste. Ich habe auch ein paar Bugs behoben z.B. den Bug, dass man einen Lehren Namen der Capsule geben konnte, wenn man diese geupdated hat. Dann habe ich noch automatisches Scrolling bei den Containern hinzugefügt. hier ist noch ein Bild von dem Geupdateten changeCapsule: ![1687440760994](image/documentation/1687440760994.png)

## Tag 8 / 22.06.2023

Heute habe ich auch wieder wie gestern verschiedenste Dinge gemacht und ein paar Dinge implementiert. Als erstes, habe ich es gemacht, dass man seine Email und sein Passwort ändern kann. Dann habe ich noch ein paar Zusätzliche Dinge gemacht, wie z.B. dass man jetzt auch als User Capsules verlassen kann. Ich habe mich dann auch noch darum gekümmert, dass wenn man eine bestimmte Capsule suchen wollte, dann musste man früher den korrekten Namen eingeben, damit man etwas als Ergebnis bekommt. Auch konnte man nur nach dem Room Namen suchen und nicht nach der Room Beschreibung und so habe ich ein paar Dinge gereworked. Ich habe es jetzt implementiert, dass man nach etwasem suchen kann und dann wird mit einem Like pattern entschieden, was dieses Wort beinhaltet. Auch kann man jetzt nach Room Beschreibungen suchen. Hier sind Bilder, wie das neue Home und das Searching jetzt aussieht:

![1687441076026](image/documentation/1687441076026.png)

![1687441085390](image/documentation/1687441085390.png)

## Tag 9 / 23.06.2023

Heute habe ich verschiedenste Dinge gemacht, wie z.B. Bug fixing aber ich habe heute noch das beste gemacht, was mir eingefallen ist. Denn ich habe es hingebracht, dass man nun Leute aus seinen Chat Rooms bannen kann und dann werden auch denen, welche gebannt wurden die Rooms nicht mehr angezeigt. Ansonsten habe ich heute nicht sehr viele Dinge gemacht, ich hatte zwar heute ein paar Probleme, weil wenn man jemanden bannt, dann muss man diese ja auch falls diese im Chat ist direkt aus diesem Hinauswerfen und so habe ich die verschiedensten Socket Events gemacht. Auch habe ich meine Datenbank erweitert, mit der SocketID, denn diese brauche ich um die verscheidensten einzelnen Clients zu erkennen und dann an diese spezielle Events schicken kann. Hier ist noch ein Foto, wie der Bannungs Bildschirm aussieht (derzeitig sieht es aber nicht so toll aus, weil es noch nicht ganz fertig ist):

![1687875058293](image/documentation/1687875058293.png)

# Beschreibung der API Endpoints

## /

Hier kann man sich einloggen und man sieht einfach die Login Page.

## /registration

Hier kann man User registrieren.

## /home

Hier sieht man sein eigenes Home also sieht man hier alle seine Capsules, welche man ertellt hat.

## /search

Hier kann man verschiedenste Capsules suchen und diesen auch Joinen, damit man sie auf /home wieder sieht.

## /createCapsule

Hier kann man Capsules erstellen und dann können Leute auf diese Joinen, damit man mit ihnen Chatten kann.

## /logout

Hier kann man sich ausloggen, dann wird einfach der JWT, welcher in einem Cookie gespeichert wird gelöscht und man muss sich zuerst wieder einloggen, damit man etwas wieder machen kann.

## /ip

Hier bekommt man die Aktuelle Server IP, diese wird einfach verwendet, damit die IP nicht auf den Clients hard gecoded ist.

## /account

Hier kann man seine Accountdaten mit einer Post request ändern und man bekommt, wenn man eine Get request macht, das HTML geliefert.

## /changeCapsule

Hier kriegt man wieder mit einer Get request, dass HTML geliefert.

## /banUser

Hier kriegt man ein HTML zurückgeliefert. Ab diesem Zeitpunkt läuft dann alles wieder über Socket connections.

# Inbetriebnahme

Damit man das Programm in Betrieb nehmen kann braucht man eigentlich nur etwas und das ist der Code, welcher auf meinem Github bereitgestellt wird. Nachdem man den Code hat, kann man dann endlich starten und mit `<npm install>` Die Dependencies herunterladen, damit man den Server starten kann. Danach kann man mit `<nodemon index.js>` oder mit `<node index.js>` den Server starten. Dabei ist es wichtig zu wissen, dass der Port 8080 frei sein muss, ansonsten funktioniert es nicht. Nachdem man es gestartet hat, kann man als Host mit `<localhost:8080>` auf den Server zugreifen und wenn man ein Client ist, welcher sich auf den server Connecten will kann man mit `<http://server-ip:8080>`die Server IP kann man mit dem `<ip config>` command herausfinden und so kann man sich dann auch schon unterhalten. Dies geht aber nur im eigenen Subnetz und das Protokoll ist HTTP.

# Beschreibung der wichtigsten Komponenten

## Home

Auf dem Home Bildschirm sieht man seine Rooms / Capsule, welchen man gejoined ist und so kann man nachdem man sich ausgelogged und wieder eingelogged dann wieder ganz schnell in den Rooms loschatten. Wenn mal eine Capsule verschwindet, so ist es möglich, dass man von dieser Capsule / diesem Room gebannt worden ist. Wenn man dann auf den Chat button clicked, befindet man sich auf der nächsten Seite im angeklickten room.

## search

Wenn man zuerst auf den search Bildschrim kommt, sieht man als erstes die zwei buttons und auch ein Eingabefeld. Wenn man etwas auf dem Eingabefeld eingibt und dann auf search klickt, werden einem diese rooms angezeigt, welche am besten zu der Beschreibung in dem Eingabefeld passen. Diese werden mit einem Like aus der Datenbank ausgegeben. Auch gibt es die Möglichkeit links neben dem Eingabefeld auszuwählen, ob man nach dem Capsule Name suchen will oder nach der Capsule description. Je nachdem was man anwählt, wird nach dem gesucht. Mit dem Search All button kann man nach allen Capsules suchen, in welchen man noch nicht drinnen ist und nach den Capsules, von welchen man noch nicht gebannt worden ist. Wenn man dann nach etwas gesucht hat und dann einem gefällt, was man sieht, kann man diesem Room / Capsule beitreten und so kann man auch direkt in diesem Room loschatten.

## create Capsules

Wenn man zuerst auf dem Create Capsules Bildschirm landet, kann man den Namen und eine Description eingeben. Aber man fragt sich vielleicht für was? Dies ist einfach beantwortet, denn hier kann man wie der Name der Page schon zu vermuten mag, Capsules / Rooms erstellen. Man kann hierbei eine Capsule ohne eine Description eingeben aber auch eine Capsule mit einer Description. Wenn man jetzt nur eine Description eingeben würde oder man einen Name wählen würde, welcher nicht mehr verfügbar ist. Wird der User über das informiert und er muss seine Eingaben korrigieren. Wenn man erfolgreich eine Capsule / ein Room erstellt hat, werden die Eingaben aus dem Eingabefeld gelöscht und man kann seine Capsule, welcher man automatisch gejoined ist auf dem Home Bilschirm oder auf dem nächsten Bildschirm anschauen.

## change Capsules

Wenn man auf diesen Bildschirm kommt, sieht man seine Capsules, welche aufgelistet werden. Dann sieht man aber auch zwei Buttons nämlich den Change Capsule button und den Ban User button. Aber zu dem Ban User button kommen wir später schauen wir uns erst einmal den Change Capsule button an. Wenn man auf diesen button clicked, erscheinen ein paar Elemente unter der Capsule hier kann man dann auf auf Close klicken, wenn man z.B. ausversehen draufgedrückt hat oder man kann etwas eingeben und dann auf Submit drücken, damit die änderungen vorgenommen werden. Wenn man hierbei jetzt nur eine Descirption ändert, behält man den Namen von vorher und wenn man nur den Namen ändert, behält man die Description von vorher. Wenn hierbei einen Namen wählt, welcher schon existiert, dann wird der User über dies informiert und er muss den Namen neu wählen. Wenn man auf das kleine Kreuz oben rechts auf der Box Clicked, dann deleted man seine Capsule / sein Room. Dann ist dieser nicht mehr verfügbar. Wenn man aber auf den Ban User button Clicked, dann wird man auf die nächste Page weitergeleitet.

## ban User

Auf dieser Page, werden einem die User angezeigt, welche in deinem Room / Capsule sind. Hierbei sieht man zwei Kategorien Unabnned users und Banned users. Wenn man jetzt einen User hat, welcher sich nicht angemessen verhält, kann man diesen Bannen. Dann wird dieser unten bei Banned users angezeigt und man könnte ihn Theoretisch wieder entbannen. Wenn ein User gebannt wird, dann kann er nicht mehr in den Room schreiben und ihm wird auch nicht mehr dieser Room angezeigt. Das heisst, er kann gar nicht mehr mit diesem Room / Capsule interagieren. Wenn man jetzt diesen User wieder entbannen möchte, dann kann man auf den unban button klicken und er kann diesem Room / Capsule dann wieder joinen und er kann die gleichen Dinge machen wie vor dem Bann. Wenn man jetzt aber etwas genauer hinschaut, dann kann man vielleicht feststellen, dass in der URL dies steht: `http://localhost:8080/banUser?room=hallo`. Die Aufmerksamen haben bemerkt, dass ein `?room=hallo` hinter der normalen URL steht. Also könnte man vielleicht andere Rooms damit manipulieren. Das habe ich mir auch gedacht und es geht nicht mehr. Denn es wird auf der Server Seite geprüft, ob eienm dieser Room / Capsule gehört oder nicht, wenn es dann aber doch jemand probieren möchte, dann wird er darüber informiert, dass er nicht der Besitzer der Capsule / Room ist.

## account

Hier sieht man, dass man zwei Eingabefelder hat und in diese kann man hineinschreiben, was man an seinem Account changen möchte. Wenn man nun eine Email eingibt, welche schon existiert, dann wird der User darüber informiert und er muss seine änderungen rückgangig machen. Wen man hierbei aber auf Logout klickt, dann wird der Token, welche der User hat gelöscht und er wird ausgelogged.

## Chat

Wenn man von der Main Page auf den Chat button bei einem Room klickt, dann wird man auf den Chat weitergeleitet. Man ist ab dieser Phase mit einem Chat Room verbunden und man kann loschatten. Aber man kann natürlich nicht undendlich lange Nachrichten eingeben, denn man kann nur limitiert viele Zeichen eingeben. Man kann aber auch nicht nur Enters in eine Nachricht schreiben, dies wird auch hinausgefiltert und der User wird darauf aufmerksam gemacht, dass er es lassen sollte, so viele Enters zu schreiben. Wenn man aber jetzt neu oder wieder in einen Chat Room kommt, dann werden die Nachrichten, welche geschrieben wurden automatisch hineingeladen und man sieht direkt das ganze Gesrpäch. Wenn man jetzt eine Message schreiben will, dann gibt man einen Text unten in der Textbox ein und man kann dann direkt `Control Enter` drücken um diese abzuschicken oder man kann auf den Send message button klicken und die Nachricht wird versendet. Diese wird nur in dem Exakten Room / Capsule angezeigt, in welcher man sich gerade befindet. Diese Leute die ebenfalls in dem Room sind, kriegen dann auch diese Message und man kann zusammen Tolle Gespräche erleben.
