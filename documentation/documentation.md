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
