# Every send

Application web locale en français, en HTML, CSS et JavaScript, sans dépendance de fonctionnement ni compilation. Ouvrir index.html dans un navigateur récent ; un serveur local est conseillé pour conserver une origine de stockage stable.

## Budget et compte

Budget initial : **650 USD**. Frais académiques : **250 USD**. Frais connexes : **75 USD**. Frais de stage : **50 USD**.

**650 − 250 − 75 − 50 = 275 USD.** Ce reste est le montant initial introduit dans le compte. Les virements, paiements et mouvements d’épargne locaux modifient ensuite le solde du compte.

Le **carnet de dépenses** est indépendant : une dépense notée, même supérieure au solde bancaire, ne débite pas le compte, ne modifie pas l’épargne et ne crée pas de transaction bancaire. Les dépenses peuvent être supprimées après confirmation.

Les anciennes données sont sauvegardées sous every-send-before-budget-v3 avant migration. Les anciennes lignes du budget sont remplacées par l’entrée initiale de 275 USD ; les autres opérations et les bénéficiaires sont conservés. Les données restent propres au navigateur et à son origine.

## Fonctionnalités

Navigation, recherche et export CSV des transactions, virements avec confirmation et contrôle du solde, paiements locaux, bénéficiaires, épargne, paramètres de carte, profil et photo locale JPG/PNG/WebP de 3 Mo maximum. Les montants saisis sont toujours en USD. La vue CDF utilise un taux fixe de démonstration de 2 800 CDF pour 1 USD.

Les données sont stockées localement. Aucun service bancaire ou messagerie distante n’est connecté. Une demande d’assistance est uniquement enregistrée sur l’appareil.

## Présentation et mobile

Interface responsive, contrastes renforcés, boutons tactiles, menu mobile avec fond de fermeture, navigation au clavier et modales défilantes. Aucun CDN ni police distante.

## Connexion locale

Connexion configurée pour `leonardkitoko6@gmail.com` avec le mot de passe fourni. Le fichier `auth.js` contient une empreinte PBKDF2-SHA-256 avec sel et 210 000 itérations ; le mot de passe n’est pas conservé en clair dans les fichiers de l’application. La vérification utilise Web Crypto : servir l’application sur HTTPS ou localhost dans un navigateur récent.

La session est conservée dans l’onglet pendant 30 minutes maximum. La déconnexion masque les écrans et ferme les fenêtres sans supprimer les dépenses et transactions. Le menu comporte un bouton Déconnexion.

Il s’agit d’un verrouillage d’interface local : il ne protège pas les données du navigateur contre une personne ayant accès aux outils de développement ou aux fichiers de l’appareil. Une authentification réelle nécessite un serveur, des sessions contrôlées côté serveur et des données protégées côté serveur.

Sur téléphone et tablette jusqu’à 1 100 pixels de largeur, le bouton du menu ouvre un panneau flottant arrondi. Il se ferme par le bouton de fermeture, le fond extérieur, Échap ou le choix d’un onglet. Le focus clavier reste dans le panneau ouvert et le fond devient inactif.

Pour tester la connexion : définir `EVERY_SEND_TEST_PASSWORD` dans l’environnement avec le mot de passe configuré, puis lancer `node .qa/auth.cjs`. Aucun mot de passe de test n’est enregistré dans ce script.

Ce dépôt ne contient pas de projet Android, de configuration Gradle ou de chaîne de signature : **aucun APK n’est produit**. Le rendu Android et l’intégration dans une WebView devront être validés dans le projet Android qui embarquera ces fichiers.

Voir AUDIT.md pour les corrections et les limites de vérification.
