# Plan de marquage LeadFlow

## 1. Objectifs

| Question                                      | KPI                     | Calcul                                                                           |
| --------------------------------------------- | ----------------------- | -------------------------------------------------------------------------------- |
| Les visiteurs ajoutent-ils au moins un lead ? | Taux d'activation       | visiteurs avec au moins 1 lead ajouté ÷ visiteurs                                |
| Où l'ajout échoue-t-il ?                      | Taux d'échec par raison | ajouts refusés ÷ tentatives (ajouts réussis + refusés)                           |
| Recherche et filtre servent-ils ?             | Taux d'usage de chacun  | utilisateurs ayant fait au moins 1 recherche (ou 1 filtre) ÷ utilisateurs actifs |

## 2. Conventions

- **Outil :** GA4.
- **Noms d'événements :** anglais, snake_case, format action_objet (`add_lead`), 40 caractères maximum.
- **Paramètres et valeurs :** anglais, snake_case, valeurs en minuscules issues d'une liste fermée ; un même concept garde toujours le même nom (`lead_status` partout).
- **Données personnelles :** aucun texte saisi par l'utilisateur. Interdits : nom, email, entreprise, texte de recherche. Autorisés : statuts, raisons d'erreur, longueurs, nombres.

## 3. Événements

| Événement            | Paramètres (valeurs)                                           | Déclencheur                     | Question servie | Statut      |
| -------------------- | -------------------------------------------------------------- | ------------------------------- | --------------- | ----------- |
| `add_lead`           | `lead_status` (new, contacted, qualified, won, lost)           | lead ajouté à la liste          | Activation      | implémenté  |
| `add_lead_failed`    | `error_reason` (missing_field, invalid_value, duplicate_email) | ajout refusé                    | Friction        | implémenté  |
| `update_lead`        | `fields_changed` (full_name, company, estimated_value)         | modification sauvegardée        | Valeur          | écart (1)   |
| `delete_lead`        | `lead_status` (mêmes valeurs)                                  | lead supprimé                   | Valeur          | implémenté  |
| `change_lead_status` | `previous_status`, `new_status` (mêmes valeurs)                | clic sur Marquer comme contacté | Valeur          | implémenté  |
| `search_leads`       | `query_length`, `results_count` (nombres)                      | 1 s après la dernière frappe    | Usage recherche | implémenté  |
| `filter_leads`       | `lead_status` (all, new, contacted, qualified, won, lost)      | changement du filtre            | Usage filtre    | implémenté  |

(1) Le code envoie aujourd'hui les noms de clés JavaScript (`fullName`, `society`, `estimatedValue`) au lieu des valeurs du plan. À corriger dans le code (ticket F1).

Statuts : à faire → implémenté (code poussé) → validé (recette DebugView OK).

## 4. Dimensions et métriques personnalisées GA4

Déclarées dans GA4 (Admin, Définitions personnalisées) : `lead_status` le 2026-10-29, les 6 autres le 2026-10-31. Ce n'est pas rétroactif : les données antérieures à la déclaration n'ont pas ces champs.

| Paramètre         | Type      | Portée    | Description                                  |
| ----------------- | --------- | --------- | -------------------------------------------- |
| `lead_status`     | dimension | événement | statut du lead (ou filtre choisi)            |
| `error_reason`    | dimension | événement | raison du refus d'ajout                      |
| `fields_changed`  | dimension | événement | champs modifiés                              |
| `previous_status` | dimension | événement | statut avant changement                      |
| `new_status`      | dimension | événement | statut après changement                      |
| `query_length`    | métrique  | événement | nombre de caractères tapés dans la recherche |
| `results_count`   | métrique  | événement | nombre de leads trouvés                      |

## 5. Filtres de données

- **Trafic des développeurs** (actif) : tout événement envoyé depuis `localhost` porte `debug_mode`, visible dans DebugView mais exclu des rapports.
- Pas de filtre IP : la connexion mobile change d'IP trop souvent.

## 6. Recette

Pour chaque événement, dans DebugView :

- [ ] Il part au bon moment (après succès, pas à la tentative)
- [ ] Il part une seule fois (pas de doublon)
- [ ] Le nom est exactement celui du plan
- [ ] Chaque paramètre est présent, avec une valeur de la liste prévue
- [ ] Aucune donnée personnelle dans la requête (onglet Réseau, filtre « collect »)
- [ ] Il ne part pas tant que le consentement est refusé
- [ ] Il apparaît dans DebugView (capture jointe)

Quand tout est coché, passer le statut de l'événement à « validé » dans la section 3.

## 7. Journal des changements

| Date       | Changement                      | Raison                         |
| ---------- | ------------------------------- | ------------------------------ |
| 2026-10-29 | Création du plan (7 événements) | Mesurer l'usage de LeadFlow V1 |
| 2026-10-29 | Propriété GA4 et `add_lead` en production | Premier événement |
| 2026-10-30 | Bannière de consentement (Consent Mode) | Conformité : rien n'est mesuré avant accord |
| 2026-10-31 | 7 événements implémentés, 6 définitions personnalisées, filtre trafic développeur | Plan complet ; exclure les tests des rapports |
