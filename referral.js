/**
 * Handles copying the referral link to the clipboard.
 * Supports both modern API and legacy fallback for older mobile browsers.
 */
export const copyReferralLink = async (referralCode) => {
    if (!referralCode || referralCode === 'N/A') {
        alert('No referral code available to copy.');
        return;
    }

    // 1. Construct the full URL
    // e.g., https://jjbwines.com/#register?ref=OJ2938
    const origin = window.location.origin;
    const fullLink = `${origin}/#register?ref=${referralCode}`;

    // 2. Try Modern API (Clipboard API)
    if (navigator.clipboard && navigator.clipboard.writeText) {
        try {
            await navigator.clipboard.writeText(fullLink);
            alert('Referral link copied to clipboard!');
            return;
        } catch (err) {
            console.warn('Clipboard API failed, attempting fallback...');
        }
    }

    // 3. Fallback: Legacy Textarea Method (Reliable on older Androids/iOS)
    try {
        const textArea = document.createElement('textarea');
        textArea.value = fullLink;
        
        // Make it invisible but part of the DOM
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        textArea.style.top = '0';
        document.body.appendChild(textArea);
        
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);

        if (successful) {
            alert('Referral link copied to clipboard!');
        } else {
            throw new Error('execCommand returned false');
        }
    } catch (err) {
        // 4. Ultimate Fallback: Prompt the user to copy it manually
        prompt("Copy your referral link:", fullLink);
    }
};

/**
 * extracts the referral code from the URL hash if present.
 * e.g. #register?ref=CODE123 -> returns "CODE123"
 */
export const getReferralFromUrl = () => {
    const fullHash = window.location.hash;
    if (fullHash.includes('?ref=')) {
        const parts = fullHash.split('?ref=');
        if (parts.length > 1) {
            // Split by '&' just in case there are other parameters later
            return parts[1].split('&')[0];
        }
    }
    return '';
};
