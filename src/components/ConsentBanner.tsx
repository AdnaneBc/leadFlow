import { useEffect, useState } from "react";
type ConsentType = "granted" | "denied" | null;

const ConsentBanner = () => {
  const [consent, setConsent] = useState<ConsentType>(() => {
    const consentStatus = localStorage.getItem("consent");
    if (consentStatus === "granted" || consentStatus === "denied")
      return consentStatus;
    return null;
  });
  useEffect(() => {
    if (consent !== null) {
      window.gtag("consent", "update", { analytics_storage: consent });
    }
  }, [consent]);
  function acceptConsent() {
    localStorage.setItem("consent", "granted");
    setConsent("granted");
  }
  function denyConsent() {
    localStorage.setItem("consent", "denied");
    setConsent("denied");
  }
  if (consent !== null) return null;
  return (
    <div className="consent-banner">
      <p>
        LeadFlow mesure anonymement son utilisation pour s’améliorer. Aucune
        donnée de vos leads n’est envoyée.
      </p>
      <div className="consent-buttons">
        <button onClick={acceptConsent}>Accepter</button>
        <button onClick={denyConsent}>Refuser</button>
      </div>
    </div>
  );
};

export default ConsentBanner;
