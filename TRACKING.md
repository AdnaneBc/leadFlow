# Plan de marquage LeadFlow

## 1. Objectifs

Question KPI Calcul
Les visiteurs ajoutent-ils au moins un lead ? Taux d’activation visiteurs avec au moins 1 lead ajouté ÷ visiteurs
Où l’ajout échoue-t-il ? Taux d’échec par raison ajouts refusés ÷ tentatives
Recherche et filtre servent-ils ? Taux d’usage de chacun utilisateurs ayant fait au moins 1 recherche (ou 1 filtre) ÷ utilisateurs actifs

## 2. Conventions

Outil : GA4.
Noms d’événements : anglais, snake_case, format action_objet (add_lead), 40 caractères maximum.
Paramètres et valeurs : anglais, snake_case, valeurs en minuscules issues d’une liste fermée ; un même concept garde toujours le même nom (lead_status partout).
Données personnelles : aucun texte saisi par l’utilisateur. Interdits : nom, email, entreprise, texte de recherche. Autorisés : statuts, raisons d’erreur, longueurs, nombres.

## 3. Événements

Événement Paramètres (valeurs) Déclencheur Question servie Statut
add_lead lead_status (new, contacted, qualified, won, lost) lead ajouté à la liste Activation à faire
add_lead_failed error_reason (missing_field, invalid_value, duplicate_email) ajout refusé Friction à faire
update_lead fields_changed (full_name, company, estimated_value) modification sauvegardée Valeur à faire
delete_lead lead_status (mêmes valeurs) lead supprimé Valeur à faire
change_lead_status previous_status, new_status (mêmes valeurs) clic sur Marquer comme contacté Valeur à faire
search_leads query_length, results_count (nombres) 1 s après la dernière frappe Usage recherche à faire
filter_leads lead_status (all, new, contacted, qualified, won, lost) changement du filtre Usage filtre à faire

## 4. Dimensions personnalisées GA4

| Paramètre | Portée    | Description |
| --------- | --------- | ----------- |
| ...       | événement | ...         |

## 5. Recette

- [ ] ...

## 6. Journal des changements

| Date       | Changement       | Raison |
| ---------- | ---------------- | ------ |
| 2026-10-30 | Création du plan | ...    |
