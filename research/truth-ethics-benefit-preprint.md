# Truth, Ethics, and Benefit: A Multi-Source Framework for Practical Deliberation

**Umut Candan**

*Working paper — preprint version 1.0*

---

## Abstract

Modern Western philosophy has gained analytic clarity by separating the questions "How do I know if something is true?", "How do I know if something is ethical?", and "How do I know if something is beneficial?" into the distinct sub-disciplines of epistemology, normative ethics, and decision theory. It has lost, in the process, the practical unity within which actual human agents must answer these three questions simultaneously when they decide how to act. This paper argues that the three judgments are irreducible to one another — Hume and Moore are right about the formal point — but cannot be responsibly isolated either. Their integration in any actual deliberation is achieved through the agent's intentional orientation (*niyya*, *qaṣd*), and operates within historically embodied traditions of practical reasoning. Drawing primary sources from both the analytic philosophical tradition (Russell, Hume, Kant, Moore, Wittgenstein, MacIntyre, Plantinga, Husserl) and the classical Islamic intellectual tradition (Qurʾān and *Sunna*; al-Ghazālī, al-Shāṭibī, Ibn Taymiyya; Ashʿarī/Muʿtazilī meta-ethical debate; Saʿīd Nursī; Tāhā ʿAbd al-Raḥmān), the paper develops a four-source framework — revelation (*waḥy*), reason (*ʿaql*), sense-experience (*tajriba*), and conscience (*qalb / ḍamīr*) — in which the four sources are mutually necessary but asymmetrically ordered. Six falsifiable commitments are stated. The framework is stress-tested against six pressure points (Hume's challenge; Ashʿarī/Muʿtazilī meta-ethics; slavery and abolition; divergent fatāwā on organ donation; *naskh* and epistemic stability; AI personhood); five tests confirm and one (slavery) reveals genuine strain that is reported rather than papered over. The paper closes with the formal specification of a deliberation algorithm — input fields, scoring formula with maqāṣid tier weights, hard constraints, intention modifier, output classification — implementable as a decision-support tool that structures user reasoning without issuing *fatāwā* or replacing scholarly consultation. Three worked examples (workplace honesty, organ donation, ribā-adjacent financial decision) walk the algorithm end-to-end. A Turkish executive summary, a cross-traditional concept-mapping table across five axes (truth, knowability, ethics, benefit, intention), and a primary/secondary bibliography in IJMES transliteration are included.

**Keywords:** Islamic ethics; comparative philosophy; epistemology; *maqāṣid al-sharīʿa*; *niyya*; intentionality; is/ought problem; Ashʿarī ethics; Saʿīd Nursī; Tāhā ʿAbd al-Raḥmān; deliberation theory; decision support; *yaqīn*; correspondence theory of truth.

---

## 1. Introduction

### 1.1 The three questions and the practical unity that holds them

Any reflective person, when she actually has to decide how to act, asks three questions at once.

She asks whether the relevant facts are as she takes them to be: whether the job offer is real, whether the medical recommendation is sound, whether the report from her colleague is accurate. This is the truth question.

She asks whether the act she is contemplating is morally permissible: whether to take the job involves any compromise of integrity, whether the procedure is consistent with what she owes to those who depend on her, whether the report can be passed on without participation in injustice. This is the ethics question.

She asks whether the act will, on balance, do good rather than harm: to herself, to her family, to her community, in the time horizon she is responsible for. This is the benefit question.

And she asks all three simultaneously, weaving the answers together as she goes, in a way that no philosophy textbook on epistemology, normative ethics, or decision theory, taken on its own, will help her with — because the textbooks have separated what the agent must integrate.

This paper argues that the integration the agent achieves is not a happy accident or a failure of analytic rigor. It is a structural feature of practical deliberation that any adequate philosophical account must theorize. The three judgments are distinct — they are answerable to different evidence and licensed by different procedures — but they are not separable in principle. They cohere within the agent because the agent who asks them is one agent, with one standing orientation toward what matters, deliberating under one set of conditions about what she is going to do.

### 1.2 The thesis

The thesis to be developed and defended is precise.

> **Truth-judgment, ethical-judgment, and benefit-judgment are three irreducible moments of one deliberative act. They cannot be deductively reduced to one another (Hume and Moore are right about that), but they cannot be responsibly isolated from one another either. Their integration, in any actual deliberation, is achieved through the agent's intentional orientation (*niyya*, *qaṣd*) and operates within historically embodied traditions of practical reasoning. The four sources of input to this deliberation — revelation (*waḥy*), reason (*ʿaql*), sense-experience (*tajriba*), and conscience (*qalb / ḍamīr*) — are mutually necessary but asymmetrically ordered, and the rules of their interaction must be specified rather than waved at.**

The claim is intended to be defensible to three distinct readers: (i) a Muslim reader for whom revelation is binding, who will recognize the framework as a contemporary articulation of resources internal to her own tradition; (ii) a secular reader for whom revelation is a tradition's resource rather than an authority, who can engage the framework as a study in comparative philosophy without adopting its theological commitments; (iii) an Aristotelian or virtue-ethicist reader who will find the integration claim resonant on grounds that do not require theology at all. The writing addresses all three readers without flattering or excluding any.

### 1.3 What this paper is not

The paper is not a survey. The contemporary literature already contains many surveys of Islamic ethics, of the is/ought debate, of *maqāṣid* theory, of the analytic-philosophical engagements with religious epistemology. The reader of this paper is presumed to have access to those surveys and to want what comes after them: a committed synthesis that takes positions, with the disagreements preserved where they are irreducible, and with what the framework cannot handle reported honestly rather than concealed.

The paper is not Islamic apologetics. The argument that Islamic intellectual resources have something to contribute to the contemporary discussion is not the same as the argument that Islam has the right answers and Western philosophy is catching up. Both civilizational triumphalisms are intellectually lazy and are explicitly rejected as failure modes (§7).

The paper is not a secular dismissal of religious sources. The argument that revelation functions as one input among four is not the argument that revelation is dispensable or that its authority can be reduced to its alignment with reason. The four sources are co-necessary in the framework; their asymmetry is internal, not a covert hierarchy in which one source absorbs the others.

The paper is not, finally, a piece of pure theory. It is intended to drive the algorithm of a decision-support tool that helps the user structure her thinking on a real dilemma. The operationalization (§7) is constitutive, not optional. A framework that cannot be operationalized fails to do the work that motivated the project in the first place.

### 1.4 Method

The paper proceeds by three commitments.

*Direct primary-source engagement.* Russell, Kant, Hume, Aristotle, Moore, Wittgenstein, Plantinga, MacIntyre, and Husserl are quoted from their actual works, with translators named. Qurʾān is cited by *sūra* and *āya* with classical *tafsīr* references. Hadith is cited with collection, book, and number, with full Arabic and transliteration where the wording matters. Al-Ghazālī, al-Shāṭibī, Ibn Taymiyya, ʿAbd al-Jabbār, Saʿīd Nursī, and Tāhā ʿAbd al-Raḥmān are engaged through their actual texts, in translation where the original is inaccessible to the present author and with explicit acknowledgment of the mediation.

*Steel-manning before critique.* Hume's fork, Muʿtazilī rationalism, Ashʿarī voluntarism, Kantian formalism, utilitarian calculus, postmodern relativism — each is presented in its strongest form before any critical engagement.

*Internal pluralism preserved.* "The Islamic view" is never monolithic; where Ashʿarites, Muʿtazilites, Māturīdīs, Sufis, and modernists disagree, the disagreement is named. The same applies to the Western tradition: Aristotelian, Kantian, Humean, virtue-ethical, and pragmatist positions diverge sharply, and the divergences are not collapsed.

### 1.5 Plan of the paper

§2 develops the truth question through Russell, the Qurʾanic vocabulary of *ḥaqq* and *ṣidq*, the classical Islamic epistemology of *yaqīn* and *tawātur*, Ibn Taymiyya on the priority of reason and revelation, and Nursī's cumulative-case epistemology in *Āyat al-Kubrā*. §3 develops the ethics question through Hume's actual is/ought passage, Moore's open-question argument, Kant's categorical imperative engaged alongside Tāhā ʿAbd al-Raḥmān's substitution-method critique, and the Ashʿarī/Muʿtazilī debate as reassessed by Sherman Jackson, with a committed position taken (moderate Ashʿarism, Māturīdī-inflected). §4 develops the benefit question through al-Shāṭibī's three-tier *maqāṣid* hierarchy, Ibn Taymiyya's *muwāzana*, and Tāhā's vital/rational/spiritual reorganization, with an honest acknowledgment of *al-Ṭūfī* maximalism and al-Būṭī's correction. §5 (Integration) shows that the three judgments are bound by the agent's intention, reading the *niyya* hadith alongside Aristotle's *prohairesis*, Husserlian intentionality, and Kant's *Gesinnung*, and states the framework's six falsifiable commitments. §6 stress-tests the framework against six pressure points and reports failures where they occur. §7 specifies the deliberation algorithm with concrete input fields, scoring formula, and three worked examples. §8 addresses limitations and future work. The Turkish executive summary, the cross-traditional concept-mapping table, and the bibliography close the paper.

---

## 2. The Truth Question

### 2.1 Russell on the structure of truth

Bertrand Russell's *Problems of Philosophy* (1912) is still the cleanest English statement of what truth is and what it is not. In Chapter XII, Russell sets out three constraints on any acceptable theory of truth: it must allow for falsehood; it must locate truth in beliefs (judgments), not in things or facts themselves; and the truth or falsehood of a belief must depend on something *outside* the belief. He writes:

> "If I believe that Charles I died on the scaffold, I believe truly, not because of any intrinsic quality of my belief, which could be discovered by merely examining the belief, but because of an historical event which happened two and a half centuries ago. If I believe that Charles I died in his bed, I believe falsely: no degree of vividness in my belief, or of care in arriving at it, prevents it from being false, again because of what happened long ago, and not because of any intrinsic property of my belief. Hence, although truth and falsehood are properties of beliefs, they are properties dependent upon the relations of the beliefs to other things, not upon any internal quality of the beliefs."

This passage destroys the self-evidence theory (no amount of vividness makes a false belief true), the coherence theory as a *definition* (a coherent system of false beliefs would still be false), and the pragmatist theory (a useful belief about Charles I would not thereby be true). What remains, by elimination, is the correspondence theory: truth consists in some form of correspondence between belief and fact.

In Chapter XIII Russell adds the sober qualification that truth is one thing and the recognition of truth is another. We can be certain only in narrow domains — immediate experience, basic logical principles, mathematics — and must otherwise live with degrees of probable opinion graded by the quality of our evidence and the coherence of our beliefs with one another.

Russell is largely right, and this is the first commitment of the paper. Truth is correspondence to fact. Coherence is *evidence* of truth; pragmatic success is *neither* definition nor reliable evidence. To want only useful beliefs is to ask the world for permission not to know it.

What Russell's account leaves underdeveloped is the question of what *kinds of access* a finite human being legitimately has to truth so understood. This is the gap that the Islamic epistemic vocabulary — *ḥaqq*, *ṣidq*, *ʿilm*, *yaqīn*, *ẓann*, *naẓar*, *tawātur* — fills with surprising precision.

### 2.2 The Qurʾanic two-track vocabulary: *ḥaqq* and *ṣidq*

Arabic distinguishes two truth-words that English collapses into one. *Ḥaqq* is the truth of *being*: a thing is *ḥaqq* when it is genuinely what it presents itself to be, when it is real, when it is established. God is *al-Ḥaqq* (Q. 22:6, "That is because God — He is the Truth") because His being is fully and necessarily what it is. *Ṣidq* is the truth of *speech*: a statement is *ṣidq* when it accurately reports what is the case, when there is no gap between word and reality. The Qurʾān describes itself as both: *al-Ḥaqq min rabbika* ("the Truth from your Lord," Q. 2:147) and *qawl al-ṣidq* (Q. 6:115).

These are two faces of Russell's correspondence relation. *Ḥaqq* is the truthmaker; *ṣidq* is the truthbearer. The *ṣidq* of a judgment consists in its correspondence to the *ḥaqq* of the situation. This is not metaphor; it is a precise distinction the Qurʾān deploys to do work. When the Qurʾān calls itself *ṣidq*, it makes a claim that is in principle falsifiable by showing that what it reports does not correspond to what is. When it calls itself *ḥaqq*, it makes a claim about its source — that it issues from the One whose being grounds reality.

The Qurʾān's epistemic discipline rests on this distinction. It rejects three classes of belief explicitly: mere conjecture (*ẓann*) treated as certainty (*Inna al-ẓanna lā yughnī mina'l-ḥaqqi shayʾan*, Q. 53:28); inherited belief uncritically held (Q. 2:170); belief from desire (Q. 25:43, Q. 10:36). And it commands a fourth thing positively: thirteen times the Qurʾān asks *afalā taʿqilūn?* — "will you not reason?" — beginning with Q. 2:44, and many more times *afalā tatafakkarūn?*, *afalā tatadabbarūn?*, *afalā yanẓurūn?*. Reason is not a competitor of revelation in the Qurʾān; it is the addressee of revelation. The Qurʾān does not ask the reader to switch off her intellect to receive it. It asks her to switch on her intellect *in order* to receive it.

### 2.3 The classical Islamic epistemology of certainty

The classical *kalām* tradition organized human cognitive states on a scale: *jahl* (ignorance), *shakk* (doubt, balanced suspension), *ẓann* (probable opinion), *ghalabat al-ẓann* (preponderant probability), *ʿilm* (knowledge), *yaqīn* (certainty). The interesting question is not what these terms denote but what generates *yaqīn*.

Three sources were classically recognized:

(i) *The senses (ḥawāss) under proper conditions.* A healthy eye in good light sees that the table is brown. This is the bedrock; without it nothing else gets going.

(ii) *The intellect (ʿaql) operating on its self-evident first principles* (*badīhiyyāt*, *ḍarūriyyāt al-ʿaql*) — the principle of non-contradiction, the principle that every contingent existent has a cause, basic mathematical and logical truths. These yield certainty about whatever is strictly entailed by them.

(iii) *Mass-transmitted report (tawātur).* A piece of information reaches *yaqīn* through testimony when so many independent witnesses report it that collusion is impossible and shared error is excluded. Suheil Laher's *Tawātur in Islamic Thought* (Edinburgh, 2024) is the most thorough recent study; he documents that classical scholars across sectarian lines treated *tawātur* as a sufficient condition for knowledge and that the concept gives information from beyond one's own experience the same epistemic status as direct sensation. That the Qurʾān is verbatim the text the Prophet recited, that there was a Battle of Badr, that there is a city called Mecca that the present author has never visited — these are *yaqīn* by *tawātur*, not by direct observation.

To these classical sources, contemporary epistemology adds a fourth that the tradition implicitly recognized but did not theorize as crisply: the convergence of multiple independent lines of evidence. When a probabilistic argument from cosmology, a probabilistic argument from biological complexity, a probabilistic argument from the moral phenomenology of conscience, and a historical-textual argument for Qurʾanic provenance all point in the same direction, the cumulative force can be much greater than any single line. This is the structure of much real-world knowledge — courtrooms, medicine, historical reconstruction, intelligence analysis — and it is the structure Saʿīd Nursī systematizes in his major epistemic treatise.

### 2.4 Ibn Taymiyya on the relation of reason and revelation

Before turning to Nursī, it is necessary to confront Ibn Taymiyya's *Darʾ Taʿāruḍ al-ʿAql wa-l-Naql* ("Averting the Conflict between Reason and Revelation"), the most ambitious medieval treatment of the question this paper is asking. Ibn Taymiyya's adversaries were the Ashʿarī theologians who, following Fakhr al-Dīn al-Rāzī, had asserted what is sometimes called the *qānūn kullī* — the universal law — that when reason and revelation appear to conflict, reason must be given priority because revelation's authority is itself established by reason.

Ibn Taymiyya's response, painstakingly reconstructed in Carl Sharif El-Tobgui's *Ibn Taymiyya on Reason and Revelation* (Brill, 2019) and Wael Hallaq's *Ibn Taymiyya Against the Greek Logicians* (Oxford, 1993), is that reason and revelation cannot genuinely conflict, because both come from the same Author, and that the appearance of conflict is always either a defective inference or a misreading of the text. Hallaq describes Ibn Taymiyya as "an ardent sceptic, but a sceptic saved by religion" — sceptical of the Aristotelian syllogistic apparatus that he held responsible for the heretical metaphysics of the *falāsifa*, but confident that direct rational inference (*lazm*) on properly conditioned sense perception, together with *tawātur* of revelation, jointly suffice for genuine knowledge.

The structural lesson from Ibn Taymiyya is the operating rule the present paper adopts: a sound rational argument and a soundly transmitted revealed text *cannot* contradict, and where they appear to, the burden of revision falls on whichever side has weaker epistemic warrant in the particular case.

### 2.5 Nursī's cumulative case in *Āyat al-Kubrā*

Saʿīd Nursī's most systematic answer to the question "how do I know what is true about the deepest matters?" is the Seventh Ray of *The Rays Collection*, titled *Āyat al-Kubrā* — "The Supreme Sign" — also published as a separate treatise with the subtitle "Observations of a Traveller Questioning Creation Concerning his Maker." The structure is a thought experiment: a traveller, anxious to know "the Owner of this fine guest-house, the Author of this vast book, the Monarch of this mighty realm," interrogates the cosmos in 33 stages and at each stage receives a testimony.

The architecture matters. Nursī is doing three things simultaneously.

First, he is performing *cumulative-case epistemology*. No single proof is held responsible for the whole conclusion. Each "stage" or "degree" is a probabilistic witness; their conjunction yields what Nursī repeatedly calls "true and certain belief" (*īmān taḥqīqī*). This is the structure of converging evidence — formally analogous to how a jury convicts on the joint weight of testimony, forensics, and motive — and it is more honest than the single deductive proof that early-modern theology often demanded.

Second, he is *triangulating across modes*. As the traveller moves through the universe, the testimony divides into three types: the testimony of *the cosmos* (the universe itself, read as a meaningful book); the testimony of *scripture* (the Qurʾān, with its self-attesting features and its truthful reports); and the testimony of *the Prophet* (Muḥammad, whose life, character, and prophetic phenomena cannot be explained without his commission). In the Nineteenth Word and parallel passages in *al-Mathnawī al-Nūrī*, Nursī states the triangulation explicitly: "the Prophet, the Qurʾān, and the book of the universe" are three witnesses to one conclusion. They are independent in their data but converge in their verdict.

Third, he insists that some testimony is *interior*. The human conscience (*wijdān*) is itself a station of the proof. The structure of human longing — the demand for justice, the unmet desire for permanence, the aversion to nothingness — is not a weakness to be argued away but a directional clue, like a compass needle that means something only because there is a magnetic pole.

Two cautions when reading Nursī this way. The cumulative case is not a deductive proof; it does not coerce assent. A determined skeptic can resist it. What it claims to do is to make belief rational at the highest level of warrant available for first-order metaphysical questions, comparable to how we are rationally warranted in believing the past existed despite being unable to deduce it from current experience. And the cumulative case is calibrated to the questioner's own attentiveness; the witnesses are public, but the apprehending subject must be present to apprehend.

### 2.6 The four-source framework, applied to truth-judgment

Pulling these resources together yields a working epistemology with five legitimate sources of knowledge, ranked by the kind of certainty they yield:

1. Sound sense perception under proper conditions, on its proper objects.
2. The first principles of reason and what is rigorously entailed by them.
3. *Tawātur* — for the Muslim reader, this is the channel through which the verbatim text of the Qurʾān, the historical existence of the Prophet, the basic facts of Islamic history, and a small number of *mutawātir* hadiths reach the same epistemic status as direct experience.
4. Single-source report (*khabar āḥād*), including most hadiths and historical reports, which yield *ẓann* graded by the quality of the chain and the matter, and are sufficient for action where the matter calls for action but not for foundational doctrine.
5. Cumulative inferential cases that combine several of the above, of which Nursī's *Āyat al-Kubrā* is the paradigm.

Revelation is a special case of (3). Authentic revelation, transmitted by *tawātur* and rationally confirmed in its provenance, is then *itself* a source of further knowledge that exceeds what (1) and (2) can establish on their own — facts about the unseen, about the moral law in detail, about the meaning of history. The Muslim's commitment is not "revelation instead of reason" but "revelation as a *tawātur*-grounded extension of what reason could not have reached on its own, vetted by reason in its provenance and consistent with reason in its content."

The four-source framework distributes competence across question-types:

- Empirical questions → experience leads, reason orders, revelation is silent or sets bounds.
- Logical-mathematical questions → reason leads, others confirm or are silent.
- Historical/testimonial questions → reason and experience together, with conscience as sincerity-check.
- Ultimate-meaning and normative-ground questions → revelation provides horizon, reason adjudicates coherence, experience constrains, conscience verifies sincerity.

When in doubt, demand convergence: a claim supported by only one of the channels is to be held more provisionally than a claim supported by several. This is not skepticism; it is calibration.

### 2.7 The truth procedure

The committed answer to "How do I know if something is true?" is therefore: when you encounter a claim, ask in order: *Have I observed this myself under proper conditions? Is it a strict consequence of premises I am sure of? Is it transmitted by enough independent channels that collusion or shared error is implausible? Is it attested by a single source whose reliability is good? Or am I being moved by my own desire, fear, or partisanship?* The first four answers warrant assent; the fifth answer warrants alarm. Speak with the certainty your evidence actually warrants, and no more. The Qurʾān commands "do not pursue what you have no knowledge of" (Q. 17:36). Most contemporary disputes — political, religious, personal — would be improved if everyone took a vow of *yaqīn*-discipline.

---

## 3. The Ethics Question

### 3.1 Hume's actual challenge

David Hume's celebrated paragraph at the end of *Treatise* III.i.1 — Selby-Bigge edition, pp. 469–470 — is the place to begin, because no honest moral philosophy can avoid confronting it. Hume writes:

> "In every system of morality, which I have hitherto met with, I have always remark'd, that the author proceeds for some time in the ordinary way of reasoning, and establishes the being of a God, or makes observations concerning human affairs; when of a sudden I am surpriz'd to find, that instead of the usual copulations of propositions, *is*, and *is not*, I meet with no proposition that is not connected with an *ought*, or an *ought not*. This change is imperceptible; but is, however, of the last consequence. For as this *ought*, or *ought not*, expresses some new relation or affirmation, 'tis necessary that it shou'd be observ'd and explain'd; and at the same time that a reason should be given, for what seems altogether inconceivable, how this new relation can be a deduction from others, which are entirely different from it."

Read carefully, the passage makes a *narrow* logical claim: from premises composed entirely of factual statements, no purely normative conclusion follows by strict deduction. This is sometimes called *Hume's Law* and has been formally proven by Charles Pigden (*Hume on Is and Ought*, Palgrave, 2010) and by Gerhard Schurz (*The Is-Ought Problem*, Kluwer, 1997).

The narrow logical claim is correct and not seriously contested. What *is* contested is its larger metaethical interpretation. Two responses are decisive.

Alasdair MacIntyre's "Hume on 'Is' and 'Ought'" (*Philosophical Review* 68:4, 1959, pp. 451–468) argues that even Hume himself could not consistently maintain the strong reading. Hume in fact derives moral conclusions from facts about human nature, the function of social institutions, and the workings of sympathy — using what we would now call *bridge concepts*. Hume's own promise-keeping argument deduces "we ought to keep our promises" from facts about human feelings and social practice, *via* the bridge concept of "promising," which is partly normative.

The teleological response goes further. If "human being" is not a bare biological description but, as Aristotle held in *Nicomachean Ethics* I.7, a functional concept (a being with a characteristic *ergon* whose proper exercise is its *eudaimonia*), then "is" and "ought" are not as cleanly separable as Hume thought. Aristotle's celebrated function argument (1097b22–1098a18) reasons: as the proper functioning of an eye is to see, of a hand to grasp, of a flute-player to play well, the proper functioning of a human being is to engage in rational activity in accordance with virtue — and this is what *eudaimonia* consists in. The "ought" is built into the function from the start.

The Muslim is not committed to Aristotle, but is committed to a structurally similar move. The Qurʾān insists that man is *created for* something. *Wa-mā khalaqtu al-jinna wa-l-insa illā li-yaʿbudūn* ("I have not created jinn and men except that they may worship Me," Q. 51:56) — that is, that they may stand in *ʿubūdiyya* to their Lord. *Innī jāʿilun fī al-arḍi khalīfa* ("Indeed, I will make upon the earth a *khalīfa*," Q. 2:30). *Innā ʿaraḍnā al-amānata ʿalā al-samāwāti wa-l-arḍi wa-l-jibāli fa-abayna an yaḥmilnahā wa-ashfaqna minhā wa-ḥamalahā al-insān* ("We offered the trust [*amāna*] to the heavens and the earth and the mountains, but they refused to bear it… and man bore it," Q. 33:72). The human being has a function — *ʿubūdiyya*, *khilāfa*, *amāna* — and ethics describes how that function is properly exercised. This is the bridge concept that closes the is/ought gap for the Muslim, just as the *ergon* concept closes it for the Aristotelian.

So Hume is right that you cannot derive an "ought" from a purely descriptive "is" *if your "is" is genuinely descriptive only*. Hume is wrong if he supposes the human "is" can ever in fact be purely descriptive: human beings show up in experience already as bearers of function, role, purpose. The is/ought gap is a sword that cuts only when the descriptive premise is artificially impoverished.

### 3.2 Moore's open-question argument

G.E. Moore's *Principia Ethica* (1903) §§13–14 develops the open-question argument and the naturalistic fallacy. The argument: for any proposed natural-property definition of "good" (good = pleasure, good = desire-satisfaction, good = evolutionary fitness, good = whatever the agent approves), the question "but is *that* good?" remains intelligibly open. If "good" *meant* "pleasant," then "but is the pleasant good?" would be a closed question, like "is a triangle three-sided?". The fact that the question remains open, Moore argues, shows that "good" is not synonymous with any natural property.

Moore is largely right that "good" is not definable as pleasure, desire-satisfaction, or any single natural property. The framework's response is not to revive a naturalistic definition but to reject Moore's further inference that "good" must therefore be a *sui generis* non-natural property accessible only to moral intuition. *Good* is an evaluative concept that operates in relation to teleological context. *Ḥusn* in the Islamic tradition is similarly relational: the goodness of an act includes both its conformity to the agent's *fiṭra* and its place in the divine economy of meaning. The open-question argument succeeds against naïve naturalism but does not establish the moral non-naturalism Moore inferred from it.

### 3.3 Kant and Tāhā ʿAbd al-Raḥmān

Immanuel Kant's *Grundlegung zur Metaphysik der Sitten* (1785) is the most ambitious modern attempt to derive a substantive ethics from reason alone, without reliance on a divine command or an empirical end. Kant opens the *Grundlegung* with a famous sentence:

> "It is impossible to conceive anything at all in the world, or even out of it, which can be taken as good without qualification, except a *good will*."

He proceeds to argue that the only unconditional good is the good will, which acts not from inclination but *from duty*; that to act from duty is to act from respect for the moral law; and that the moral law for finite rational beings takes the form of the *categorical imperative* — an unconditional command, not a hypothetical one. The formulations include:

> "Act only according to that maxim through which you can at the same time will that it become a universal law" (the formula of universal law).
>
> "So act that you use humanity, in your own person as well as in the person of any other, always at the same time as an end, never merely as a means" (the formula of humanity).
>
> "Every rational being must so act as if he were through his maxim always a lawmaking member in the universal kingdom of ends" (*Reich der Zwecke*).

In the *Critique of Practical Reason* (1788), Kant supplements this with the doctrine of the postulates of practical reason: morality requires that we *postulate* (not theoretically know) freedom, the immortality of the soul, and the existence of God — because the *summum bonum* that morality demands we strive for, the proportionate union of virtue and happiness, is not realized in the phenomenal world.

The system is impressive. But the question is whether it is what it presents itself to be: a discovery of pure reason, neutral with respect to revealed religion, available to any rational being qua rational. Tāhā ʿAbd al-Raḥmān argues, in *Suʾāl al-Akhlāq* (Casablanca, 2000) and *al-Mafāhīm al-Akhlāqiyya bayna al-Muslimīn wa-l-ʿAlmāniyyīn*, that it is not.

Tāhā's argument is that Kantian ethics is the result of a *method of substitution* (*ṭarīq al-mubādala*): every key concept in Kant's moral system is the secularized counterpart of a concept in Pietist Lutheran moral theology. The substitutions, item for item: faith → reason; divine will → human will; the unconditional goodness of God → the unconditional goodness of the will; divine command → categorical imperative; transcendence → impartiality; love of God → respect for law; God legislating for others → self-legislating humans; divine reward (*thawāb*) → *summum bonum*; heaven → kingdom of ends. Tāhā's conclusion: "Religion is the cradle of non-religious ethics, because the reality of non-religious ethics is that it is merely religious ethics in disguise."

This is not a dismissal of Kant. Kant is a serious thinker, and many of his substantive moral conclusions (do not lie, treat persons as ends, do not instrumentalize the rational humanity in others) are independently defensible. The point is narrower: *Kant's claim to have grounded ethics on reason alone, neutral with respect to revealed religion, fails on its own terms.* The categorical imperative carries with it, smuggled, the entire architecture of a particular religious tradition. The Muslim is therefore not under any rational obligation to adopt Kantian ethics as a religion-neutral default; she is permitted to say that her tradition's ethics is older, structurally analogous, and more coherent because it admits its theological foundations openly.

A critical counterweight is necessary here. Farid Suleiman, in "The Philosophy of Taha Abderrahman: A Critical Study" (*Die Welt des Islams* 61, no. 1, 2021, pp. 39–71), argues that Tāhā's three trusteeship principles (*shahīdiyya*, *amāna*, *tazkiya*) presuppose rather than replace classical logic; the claim of an alternative *logic* collapses into an alternative *axiology*. Suleiman's correction should be adopted: Tāhā's substitution-method critique of Kant is decisive, but Tāhā's positive program does not constitute a separate logic, only a separate value-architecture. This is enough for the present argument; it is not enough for everything Tāhā wants to claim.

Wael Hallaq's *Reforming Modernity: Ethics and the New Human in the Philosophy of Abdurrahman Taha* (Columbia, 2019) develops Tāhā's project as *post-secular* rather than anti-modern: it accepts the genuine achievements of modern thought (logical rigor, attention to the autonomy of the moral subject, suspicion of mere convention) while exposing the unacknowledged theological architecture beneath them.

### 3.4 The Ashʿarī/Muʿtazilī debate, performed

The classical Islamic question was: are good and evil (*ḥusn* and *qubḥ*) intrinsic properties of acts, knowable by reason, or are they conferred properties, established only by the divine command?

The **Muʿtazila** held the first view. The locus classicus is Qāḍī ʿAbd al-Jabbār's *al-Mughnī fī Abwāb al-Tawḥīd wa-l-ʿAdl*, of which fourteen of the original twenty volumes survive. Volume VI is titled *al-Taʿdīl wa-l-Tajwīr* ("On Justice and Injustice"). Sophia Vasalou's *Moral Agents and Their Deserts: The Character of Muʿtazilite Ethics* (Princeton, 2008) translates and analyzes the key arguments. ʿAbd al-Jabbār argues that some acts — gratitude to a benefactor, the wrongness of inflicting unjustified pain, the rightness of returning a deposit — are perceived as good or evil by reason directly, *prior to* and *independent of* any divine command. Acts have moral attributes by virtue of features they bear in themselves: their being beneficial, harmful, just, unjust, oppressive, or due. This is not a denial that revelation is *needed*; it is a denial that revelation is *all we have*. Reason perceives the broad outline; revelation refines and extends.

ʿAbd al-Jabbār's strategy has a double point. (i) If reason did not perceive any moral truth on its own, we would have no rational grip on what it means to call God *just*; *ʿadl* would be a label without content, and "God is just" would degenerate into "God does whatever God does." (ii) If God commanded what is rationally evil, He would be commanding evil — which is incompatible with His justice — so morality cannot consist in *whatever* God commands.

The **Ashʿarī** counter-position is given concentrated form in al-Ashʿarī's *Kitāb al-Lumaʿ*, particularly chapter 7 on the justice of God. Al-Ashʿarī argues that "wrong" (*ẓulm*) for human beings is whatever transgresses the limit set by another with authority over them — and since no one has authority over God, nothing God does can be *ẓulm*. The implication, drawn out by later Ashʿarīs, is that *ḥusn* and *qubḥ* in the strong moral sense are conferred by divine address (*khiṭāb al-Sharʿ*); they are not intrinsic properties of acts.

The orientalist reading of Ashʿarism — that Ashʿarīs are pure divine command theorists for whom reason has no moral perception at all — has been forcefully challenged by Sherman Jackson in two key works.

In "The Alchemy of Domination? Some Ashʿarite Responses to Muʿtazilite Ethics" (*International Journal of Middle East Studies* 31:2, 1999, pp. 185–201), Jackson argues that Ashʿarīs were responding to a specific Muʿtazilī claim — that reason alone *imposes obligation* on the human being prior to and independent of God's address — and that the Ashʿarī denial of this claim is much narrower than it appears. Ashʿarīs did not deny that human beings recognize benefit and harm, justice and injustice, gratitude and ingratitude. They denied that recognition by itself generates a *moral obligation* binding on the conscience in the religious sense, prior to God's having addressed humans through revelation.

Jackson's more recent *The Islamic Secular* (Oxford, 2024) extends this. The standard Western view, "according to Ashʿarism, all values are determined by the will of God, who decides what shall be good and so forth," converts scripture into a totalizing entity that tells us "everything," leaving no room for any other modes or sources of deliberation in Islam. But this is not what mature Ashʿarism actually held. There are vast domains of human deliberation — what Jackson calls the "Islamic Secular" — where revelation is silent or under-determines, and where rational deliberation about benefit, harm, fitness, and human flourishing is not only permitted but required. The Ashʿarī denial is metaphysical (about the *ontological* status of value) and not practical (about whether reason can deliberate about the right thing to do).

This reassessment dissolves what looks like a sharp choice. The reader does not have to choose between (a) full Muʿtazilism, with reason as autonomous moral legislator, and (b) crude divine command theory, with reason as morally inert. The mature position — call it *moderate Ashʿarism* or *qualified rational moral realism* — is roughly this: reason perceives the broad outline of good and evil reliably; divine address ratifies, extends, and in cases of underdetermination *fixes* the moral law; and where reason and authentic revelation appear to conflict, the burden of resolution falls on whichever side has weaker warrant in the particular case.

The Māturīdī alternative, developed by Ramon Harvey in "Whose Justice? When Māturīdī Meets MacIntyre" (in *Justice in Islam: New Ethical Perspectives and Global Directions*, IIIT 2023), grants reason somewhat more — including the capacity to recognize broad moral obligations under God's wisdom prior to specific revelation — while remaining within Sunni orthodoxy. The framework is compatible with either moderate Ashʿarism or Māturīdism; what it rules out is both crude voluntarism and full Muʿtazilism. **This is the committed position of the paper.**

### 3.5 Nursī on the moral anthropology of weakness

Saʿīd Nursī's contribution to ethics is not a systematic theory but a phenomenology of the moral subject. The 23rd Word treats the human being under two faces, and the 30th Word — the *Risālat al-Anā* / *Ene Risalesi* — gives the metaphysics of the ego.

In the 23rd Word, Nursī begins with a striking claim: in respect of *worldly power*, the human being is contemptibly weak — "in respect of the power and actions necessary for the life of this world, he cannot compete with the most inferior sparrow" — but in respect of *spiritual reach*, "in respect of knowledge and need, and worship and supplication… he is like the monarch and commander of the animals." Man is at once vanishingly small and incomparably significant, and the resolution of the paradox is *ʿubūdiyya*: servanthood is what makes the smallness ascend.

The famous "wing of impotence and wing of poverty" passage develops this:

> "After belief, prayer is our essential duty and the basis of worship, for despite our infinite impotence, we are exposed to endless misfortune and innumerable enemies. And despite our infinite poverty, we suffer limitless need and demands… This understanding and confession of impotence and poverty will become two wings on which to fly to the highest rank: being a servant of God."

This is a moral psychology, not a moral theorem. Nursī is saying: the ethical life begins not with the assertion of autonomous will (the Kantian starting point) but with the *recognition of dependence*. The two wings (*ʿajz* and *faqr*) are not flaws to be overcome on the way to ethical maturity; they are the very organs of ethical ascent, because they orient the agent rightly to the One on whom she in fact depends.

The 30th Word — *Risālat al-Anā* — is the metaphysical complement. Nursī argues that the human "I" (*ana*, *ene*) is given as a *vāḥid-i qiyāsī*, a hypothetical unit of measurement:

> "The All-Wise Maker has entrusted each human being with selfhood having clues and samples to urge and enable him or her to recognize the truths about His Lordship's attributes and essential characteristics. Selfhood is the measure or means of comparison that makes Lordship's attributes and Divinity's characteristics known. A measure or means of comparison does not have to have actual existence, for its posited or supposed existence can serve as a measure, just like hypothetical lines in geometry."

To understand what it means that God has *power*, the ego is given limited power so that we can scale up by analogy. To understand what it means that God *knows*, we are given limited knowledge so that the analogy works. The ego is pedagogical: it exists in order to be the contrast against which divine attributes become legible. The catastrophe of the human being arises when the ego forgets its hypothetical character — forgets that it is a measuring rod, not a measured thing — and asserts itself as if it had independent reality.

From this anthropology Nursī derives an ethics: the *prophetic line* trains the ego to recognize its function (servanthood, witness, measure); the *philosophical line* (in his contemporary post-Enlightenment sense) treats the ego as an end in itself, with the systematic spiritual disorder of modernity as the result.

### 3.6 The ethics procedure

The committed answer to "How do I know if something is ethical?" is therefore: when you face a moral question, ask in order: *Does it accord with what reason and conscience consistently judge to be just and unharming, when freed from self-interest? Does it accord with what authentic revelation, properly interpreted, addresses to this case? Does it preserve the recognizable function of the human being — towards God, towards others, towards your own future self? And what is your niyya?* When the four answers converge, you are on solid ground; when they diverge, you have a problem that needs more careful work, not a shortcut.

The is/ought gap is real but bridgeable through teleological anthropology. Reason perceives the broad outline; revelation fixes the threshold cases, the ritual cases, and the ultimate horizon. Intention re-qualifies the act: a true belief held with corrupted intention is epistemically deformed; a beneficial outcome from corrupt intention is morally compromised; the same outwardly identical act, performed with two different *niyyas*, is two different acts.

---

## 4. The Benefit Question

### 4.1 The trap to avoid

It is tempting to read "benefit" through Bentham or Mill: an action is beneficial when it produces more pleasure than pain, or more preference-satisfaction than frustration, summed across all affected agents. This is the utilitarian theory of benefit, and it has the seductive appearance of being morally neutral and quantitatively tractable.

It is not. Utilitarianism conflates three things the Islamic tradition keeps carefully distinct: *benefit* (*maṣlaḥa*), *what is right* (*ḥusn*), and *what is true* (*ḥaqq*). It assumes that all benefits are commensurable on a single scale (they are not), that the relevant subject of benefit is the aggregate (it is not — there are individual *maṣāliḥ* that cannot be sacrificed for collective ones), and that the time horizon is this life (it is not — for a Muslim the calculus extends to the *ākhira*). To answer "what is beneficial?" with a utilitarian calculus is to answer the wrong question.

Aristotelian *eudaimonia* (NE I, X) does better. *Eudaimonia* is human flourishing as activity in accordance with virtue; not a feeling or preference but the realization of human function. This is a thicker concept of benefit than utilitarian utility, but it lacks the legal-juridical specification that the *maqāṣid* tradition supplies.

### 4.2 Al-Ghazālī on the foundation of *maṣlaḥa*

The classical articulation of *maṣlaḥa* as a structured concept is Abū Ḥāmid al-Ghazālī's in *al-Mustaṣfā min ʿilm al-uṣūl*. Al-Ghazālī defines *maṣlaḥa* not as the maximization of pleasure but as *the preservation of the purpose of the Lawgiver*:

> "Maṣlaḥa is originally interpreted as the attainment of benefits and prevention from harms. But we do not intend to mean it… We actually intend by maṣlaḥa the preservation of the Sharīʿah's objectives. The objective of Sharīʿah in relation to creation is fivefold: that has to preserve their religion (*dīn*), life (*nafs*), reason (*ʿaql*), progeny (*nasl*), and resource (*māl*)."

This is a decisive move. Benefit is not what humans happen to want; benefit is what serves the *function* the Lawgiver has set for human existence. The five protected goods — *dīn, nafs, ʿaql, nasl, māl* — are not arbitrary; they are the structural conditions for the human being to discharge the function the Qurʾān describes. Without religion, the orientation is lost; without life, no agent exists; without reason, no act has agency; without progeny, no future exists for the function to be passed on; without property, no material substrate exists for the function to be exercised. Al-Ghazālī adds that *maṣlaḥa* and *mafsada* are correlative: averting a serious harm counts as a benefit, and may outweigh securing a marginal positive good.

### 4.3 Al-Shāṭibī's three-tier hierarchy

The most ambitious classical systematization is Abū Isḥāq al-Shāṭibī's *al-Muwāfaqāt fī uṣūl al-Sharīʿa*, especially volume 2. Al-Shāṭibī divides the *maqāṣid al-Sharīʿa* into three tiers.

*Ḍarūriyyāt — necessities.* The indispensable goods without which human life collapses into chaos: the five enumerated above. The Sharīʿah's hardest commands are calibrated to protect these.

*Ḥājiyyāt — needs.* Goods not strictly indispensable but whose absence creates significant hardship. The Sharīʿah's many *rukhṣas* (concessions) — combining and shortening prayers in travel, *tayammum* in the absence of water, the licit forms of contract that give flexibility to commerce — operate at this level.

*Taḥsīniyyāt — refinements.* Goods that secure the dignity, beauty, and excellence of human life. They include the etiquette of cleanliness, the modesty of dress, the *ādāb* of speech and table, the aesthetic dimension of the religious life.

The structural argument — what textbook summaries miss — is that the three tiers form a directed hierarchy. Al-Shāṭibī argues, by induction (*istiqrāʾ*) over the totality of revealed rulings, that *ḍarūriyyāt* are the foundation; *ḥājiyyāt* and *taḥsīniyyāt* exist *in order to* serve them; and where the tiers conflict, the higher prevails. Within *ḍarūriyyāt*, *dīn* is generally placed first because it is the orientation that makes everything else meaningful, with the caveat that an immediate threat to *nafs* may take operational priority where the threat to *dīn* is remote.

This generates a non-trivial calculus that is neither utilitarian (because the goods are not commensurable on a single scale) nor deontological (because outcomes do matter — the law is calibrated to *outcomes* in the protected goods). It is a tiered consequentialism with deontological side-constraints, where the consequences are measured against a divinely specified function.

### 4.4 Al-Ṭūfī's maximalism and al-Būṭī's correction

The Ḥanbalī jurist Najm al-Dīn al-Ṭūfī (d. 716/1316) pushed *maṣlaḥa* to its furthest extent. In his commentary on the 32nd hadith (*lā ḍarara wa-lā ḍirār*) of al-Nawawī's *Forty Hadith*, in *al-Taʿyīn fī sharḥ al-Arbaʿīn*, al-Ṭūfī argued that *maṣlaḥa* is the strongest of the indicants of revealed law and that, in domains of social transactions (*muʿāmalāt*) and customs (*ʿādāt*), *maṣlaḥa* may even take priority over apparent textual indicants and consensus when these conflict with it.

This is too much. The danger of al-Ṭūfī's position — vividly demonstrated by some twentieth-century reformist appropriations of it — is that "*maṣlaḥa*" can become a label under which the jurist's own preferences override the text. Muḥammad Saʿīd Ramaḍān al-Būṭī's classic critique, *Ḍawābiṭ al-Maṣlaḥa fī al-Sharīʿa al-Islāmiyya* (Cairo doctorate, 1965), articulates the controlling principle: a putative *maṣlaḥa* may not contradict an established text or established consensus; it operates *within* the framework set by the Sharīʿah, not above it.

The committed reader should adopt a moderate position. *Maṣlaḥa* is a powerful interpretive resource that lets the legal tradition adapt to genuinely new situations. But it is not a master key. When you find someone arguing that a clear and well-established Qurʾanic ruling should be set aside because "it conflicts with maṣlaḥa today," ask three questions: *Whose* maṣlaḥa? *Which* tier of maṣlaḥa? *On what evidence* is the alleged conflict established? In most reformist arguments at least one of these questions has not been honestly answered.

### 4.5 Auda and Tāhā: contemporary updates

Two contemporary thinkers update the *maqāṣid* tradition in ways the present framework adopts.

Jasser Auda's *Maqasid al-Shariah as Philosophy of Islamic Law: A Systems Approach* (IIIT, 2008) treats the *maqāṣid* not as a static list but as a "system" with the formal properties of cognitive openness, multidimensionality, interrelatedness, and purposefulness. Auda's contribution is methodological: he argues that the inherited Shāṭibian list is genuine but underdeveloped, and that contemporary maqāṣid scholarship should add modern goods (justice, freedom, human dignity, community development) not as replacements but as *operationalizations* of the classical maqāṣid in modern conditions.

Tāhā ʿAbd al-Raḥmān, in *Tajdīd al-Manhaj fī Taqwīm al-Turāth* (al-Markaz al-Thaqāfī al-ʿArabī, 1994), reorganizes *al-maṣāliḥ* under three new categories that intentionally cut across the Shāṭibian taxonomy: *al-maṣāliḥ al-ḥayawiyya* (vital interests — bodily, biological, material), *al-maṣāliḥ al-ʿaqliyya* (rational interests — knowledge, education, deliberation), and *al-maṣāliḥ al-rūḥiyya* (spiritual interests — orientation toward God, growth in virtue, the cultivation of the heart's openness to the divine). Tāhā argues that the spiritual axis is systematically attenuated in modern utilitarian and Kantian ethical discourse and must be restored.

The committed reader should hold these together. Shāṭibī's hierarchy is the structural skeleton — the way the Sharīʿah's commands actually map onto the protected goods. Auda's systems approach is a methodological corrective against rigid taxonomic readings. Tāhā's three-axis reorganization is a *spiritual* corrective that prevents *maqāṣid* discourse from collapsing into the secular language of "human development indicators." The classical hierarchy without Tāhā's spiritual axis can drift into a sophisticated utilitarianism; Tāhā's axis without the classical hierarchy can drift into vague spiritualism. Both are needed.

### 4.6 The benefit procedure

The committed answer to "How do I know if something is beneficial?" is therefore: when you face a question of benefit, ask in order: *Which tier is this — ḍarūrī, ḥājī, or taḥsīnī?* *Which of the protected goods does it touch?* *Vital, rational, or spiritual maṣlaḥa, and to whom — me, my family, my community, the wider human world?* *What harms does it risk, and how certain are they?* *And what is my niyya?* When in doubt, apply the operative hierarchy: *ḍarūriyyāt before ḥājiyyāt before taḥsīniyyāt*; *darʾ al-mafāsid muqaddam ʿalā jalb al-maṣāliḥ* (averting harms takes priority over securing benefits); the certain over the merely probable; spiritual benefit outweighs merely vital benefit at the margin, provided the vital floor is not breached.

The Muslim's calculus is not bounded by this life. An act whose worldly benefit is small but whose *ākhira*-benefit is large is, on the relevant scale, more beneficial than its worldly opposite. This is not other-worldliness in the pejorative sense; it is the recognition that the relevant time horizon for a being whose ultimate situation is eternal is not the life of the body.

---

## 5. Integration: Intention as Hinge

### 5.1 Why intention does the binding work

A philosophically careful reader, having read §§2–4, will notice a pattern. Each part ends with an interior condition. Truth requires *yaqīn*, which is not just a property of the proposition but of the knower's relation to it. Ethics requires *niyya*, the inner direction that re-qualifies the act. Benefit requires *qalbin salīm* (Q. 26:88–89), the soundness of heart that makes the calculus matter. Three exterior calculi, three interior conditions. Either this is coincidence or it is structural. The thesis of this section is that it is structural: the three judgments do not float free of the agent who makes them, and the same intentional orientation is at work in all three.

### 5.2 The *niyya* hadith with attention to its structure

ʿUmar ibn al-Khaṭṭāb narrates from the Prophet Muḥammad:

> إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى. فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى اللَّهِ وَرَسُولِهِ فَهِجْرَتُهُ إِلَى اللَّهِ وَرَسُولِهِ، وَمَنْ كَانَتْ هِجْرَتُهُ لِدُنْيَا يُصِيبُهَا أَوِ امْرَأَةٍ يَنْكِحُهَا فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ.
>
> *Innamā al-aʿmālu bi-l-niyyāt, wa innamā li-kulli imriʾin mā nawā. Fa-man kānat hijratuhu ilā Allāhi wa-rasūlihi fa-hijratuhu ilā Allāhi wa-rasūlihi, wa-man kānat hijratuhu li-dunyā yuṣībuhā aw imraʾatin yankiḥuhā fa-hijratuhu ilā mā hājara ilayhi.*
>
> "Actions are only by intentions, and each person shall have only what he intended. Whoever's emigration was to God and His Messenger, his emigration is to God and His Messenger; and whoever's emigration was for some worldly thing he might gain or a woman he might marry, his emigration is to what he emigrated to." (*Ṣaḥīḥ al-Bukhārī* 1, *Kitāb Bad' al-Waḥy*; *Ṣaḥīḥ Muslim* 1907, *Kitāb al-Imāra*.)

The hadith does three things at once. The particle *innamā* is one of restriction (*ḥaṣr*) — actions are *only* by intentions. Each person shall have *only* what she intended; the benefit is not external to the act but is correlated to its intention. Two emigrants undertake the same outward journey, suffer the same hardship, arrive at the same destination — and yet their emigrations are two different emigrations because the one is *to* God and His Messenger and the other is *to* what the agent wanted from it. *Niyya* individuates: it is what makes the act the act it is.

The implications for the three-question framework are immediate. A truth-claim made with the intention to deceive is not the same act as a truth-claim made with the intention to inform. A morally permissible act done with the intention to harm is not the same act as the morally permissible act done with the intention to help. A beneficial outcome procured with the intention of self-aggrandizement is not the same outcome, in the morally relevant sense, as the same outcome procured with the intention of service.

### 5.3 Aristotle on *prohairesis*

Aristotle anticipates much of this in *Nicomachean Ethics* III.2–3, in his analysis of *prohairesis* — usually translated "deliberate choice," etymologically "fore-grasping" (what one chooses *before* the act, with reasons). Aristotle distinguishes *prohairesis* from neighboring concepts: it is not appetite (*epithymia*), not spirited desire (*thymos*), not wish (*boulēsis*, which can be for impossible things), not opinion (*doxa*, which is true or false while *prohairesis* is good or bad). *Prohairesis* is "deliberative desire" (*orektikē dianoia*) or "intellectual desire" (*orexis dianoētikē*) — the unity of right desire and right reason in the act of choice (NE VI.2, 1139a35).

Three features of *prohairesis* matter here. (i) *Prohairesis* is what makes an action voluntary in the morally relevant sense (NE III.2, 1111b6–10). (ii) "We judge the character of a man by his *prohairesis* rather than by his actions" (NE III.2, 1112a1–3): actions can be the product of accident, ignorance, or coercion; *prohairesis* reveals what the agent was *aiming at*. (iii) *Prohairesis* requires a *for the sake of which* (*hou heneka*); it presupposes a teleological context.

The structural mapping to *niyya* is striking. Both concepts are interior; both individuate the act; both reveal character; both presuppose a teleological context. The differences are substantive, not structural. *Prohairesis* targets *eudaimonia*; *niyya* targets, ultimately, *wajh Allāh* (cf. Q. 92:20, *illā ibtighāʾa wajhi rabbihi al-aʿlā*). The structures align; the substantive ends differ. This is the kind of cross-traditional resonance that allows an Aristotelian and a Muslim to recognize each other as doing the same kind of work, even when they disagree about what the work is for.

### 5.4 Husserlian intentionality

Edmund Husserl, in the fifth *Logical Investigation* (1900–1901), develops what becomes the central concept of twentieth-century phenomenology: *intentionality* — the directedness or "aboutness" of conscious experience. Husserl borrowed and reformed the term from Franz Brentano, whose *Psychologie vom empirischen Standpunkt* (1874) had reintroduced the medieval scholastic concept of *intentio* into modern philosophy. Brentano had claimed that intentionality — what he called the "intentional inexistence" (*intentionale Inexistenz*) of an object in the act — was the distinctive mark of mental phenomena.

Husserl refines this. He distinguishes the *act* of consciousness, the *content* by which the act is directed, and the *object* toward which the act is directed. The same object can be intended through different contents; the same content can be exemplified in different acts. The crucial Husserlian claim is that consciousness is *always already* directed: there is no neutral, content-less consciousness onto which content gets added. To be conscious *is* to be conscious-of-something.

Husserl gives the formal grammar for what *niyya* is doing. *Niyya* is not a separate mental act layered on top of action; it is the directedness of the action itself. To act *is* to act-toward-something. The hadith's claim that "actions are only by intentions" can be glossed in Husserlian terms: actions just *are* their intentional directedness. There is no act lying behind the intention; the intention is the act, considered as a directed structure.

But Husserl's intentionality is *formal* and *morally thin*. A mind directed toward sugar in tea, a mind directed toward the Pythagorean theorem, and a mind directed toward the pleasure of revenge are all equally intentional in the Husserlian sense. The directedness is the structural feature; the moral character of the directedness is a further question. *Niyya* is not the formal property of being directed; it is the *moral quality* of the direction — toward God or away from Him, toward what He has commanded or away from it, toward sincere service or toward self-display (*riyāʾ*). Husserlian intentionality is the genus; *niyya* is a species within it.

### 5.5 Kant on *Gesinnung*

Kant's *Religion within the Boundaries of Mere Reason* (1793), Book I, introduces the concept of *Gesinnung* — variously translated as "disposition," "fundamental orientation," or "ground-maxim" — to address a problem the *Grundlegung* alone could not solve. *Gesinnung* is the agent's fundamental disposition with respect to the moral law: whether she has, at the root of her maxim-formation, made the moral law her supreme principle of choice (and is then liable to lapses) or whether she has, at the root, made self-love her supreme principle (and merely conforms to the moral law when convenient). The two *Gesinnungen* are mutually exclusive orientations.

The present paper does not endorse Kant's full doctrine of radical evil; the Islamic tradition's anthropology of *fiṭra* — the original constitution oriented toward *tawḥīd*, then overlaid by *ghafla* (heedlessness), *hawā* (lower desire), and *kibr* (pride) but not corrupted at the root in Kant's sense — is more accurate. But Kant's structural insight is correct: there is a level of intention deeper than the intention to perform a particular act. Beneath every particular *niyya* is the standing orientation of the agent — what the Sufi tradition has called the *ḥāl* (state) and beyond it the *maqām* (station) of the heart. The classical Sufi diagnostic literature — al-Muḥāsibī's *al-Riʿāya li-Ḥuqūq Allāh*, al-Ghazālī's "Book of the Marvels of the Heart" (*ʿAjāʾib al-Qalb*) in the *Iḥyāʾ*, Ibn ʿAṭāʾ Allāh's *al-Ḥikam* — exists to expose the gap between professed intention and standing orientation, and to train the agent to close it.

### 5.6 The integration thesis stated

The thesis: the three judgments of §§2–4 are three irreducible moments of one deliberative act. They are bound together because every act of deliberation is performed by an agent whose intentional orientation is constitutive of the deliberation, not external to it. The integration is not achieved by deductive reduction (which Hume and Moore have shown to fail) but by the structural fact that one and the same agent, with one and the same standing orientation, is doing all three things simultaneously when she asks "what should I do?"

A practical illustration. The agent considering a job offer asks: *Is it true that this job will allow me to support my family and contribute to a worthwhile enterprise?* (truth question, engaging sense, reason, testimony); *Is it ethical — does it violate any moral or revealed law, can I perform it with integrity?* (ethics question, engaging reason and revelation); *Is it beneficial — what does it do to the protected goods of myself, my family, my community?* (benefit question, engaging the *maqāṣid* hierarchy). If the agent answers in isolation, she gets three answers that may or may not cohere. But she does not answer in isolation: she answers simultaneously, from inside the orientation she brings to the question. If her standing orientation is toward financial security above all, the truth-question gets shaped by what she wants to believe, the ethics-question gets answered minimally, the benefit-question gets calibrated to a flat material scale. If her standing orientation is toward the divine countenance, the same three questions get answered with attention to evidential discipline, with attention to spirit and not just letter, and with attention to spiritual *maṣāliḥ* alongside vital and rational ones.

### 5.7 The six falsifiable commitments

The framework, on this account, makes six commitments precise enough to be tested. If any is shown to fail in a wide range of cases, the framework needs revision.

**Commitment 1.** A judgment of moral rightness that ignores truth-conditions is defective.

**Commitment 2.** A truth-claim pressed into action with weak evidence must be marked *ẓann*, not *yaqīn*.

**Commitment 3.** Benefit assessment cannot define the good; it can only inform it.

**Commitment 4.** Intention is always morally relevant, never sufficient on its own.

**Commitment 5.** Source conflicts must be resolved by public rules, not charismatic intuition.

**Commitment 6.** Persistent qualified disagreement is itself a meaningful output, not an error state.

---

## 6. Stress Tests

A framework that has not been stressed against hard cases is a framework whose strength is unknown. What follows is an honest attempt to apply the synthesis to six pressure points. The paper reports what holds, what strains, and what fails.

### 6.1 Hume's formal challenge

The framework concedes the formal point and denies the descriptive premise. Hume's challenge presupposes that human beings can be described in purely factual terms; this presupposition is false, because the human being shows up in experience already as a bearer of function. The honest report: a committed Humean naturalist who *insists* on purely descriptive premises cannot be brought across the gap by argument. The argument with him is over the *first* premise (whether the human can be described in purely descriptive terms), not over the *deduction*. MacIntyre's reading of Hume's own moral writings shows that even Hume smuggles teleological premises whenever he reasons about actual moral cases. **Verdict:** the framework holds for everyone except the strict descriptivist naturalist, and even there it can show the naturalist that his self-presentation is inconsistent with his practice.

### 6.2 The Ashʿarī/Muʿtazilī meta-ethical debate

The framework's commitment to "moderate Ashʿarism" — reason perceives the broad outline; revelation fixes threshold cases — is closer to the historical record than the orientalist caricature suggested. Sherman Jackson's reassessment is decisive. **Verdict:** the framework holds. The honest acknowledgment is that "moderate Ashʿarism" or "Māturīdī rationalism" are themselves substantive positions within Islamic theology, not neutral starting points; the framework has chosen sides within an internal debate and the user should know this.

### 6.3 Slavery and abolition

This is the hardest case. The Qurʾān regulates slavery rather than abolishing it; the Prophet himself owned and freed slaves; the classical legal tradition developed an extensive jurisprudence of slavery; and yet the moral consensus of contemporary Muslims and of all serious moral reasoners outside marginal positions treats slavery as an institution that should be abolished. How can the framework explain this?

Two honest answers, each with costs. *Progressive maqāṣidism* (Bernard Freamon, *Possessed by the Right Hand*, Brill 2019; Jonathan Brown, *Slavery and Islam*, Oneworld 2020) reads the textual sources as pointing toward emancipation through the trajectory of regulation. The cost is hermeneutic: the texts must be read as *pointing toward* a conclusion they do not state. *Honest acknowledgment* admits that the historical legal tradition did not reach the conclusion the contemporary consensus reaches, and that *maqāṣid*-derived conscience, applied with the best contemporary understanding of *karāma* and *ḥifẓ al-nafs*, forbids what classical jurists permitted. The cost is theological: it requires admitting that the *historical interpretation* of revelation can fail to capture what revelation, properly understood, requires.

The framework strains here, and the strain is reported. The honest position is that the framework allows revision of historical interpretation under specific *uṣūl* conditions — *takhṣīṣ*, *taqyīd*, recognition of *ʿillah*, the operation of *maqāṣid* — and that the abolitionist consensus is best read as a legitimate operation of these procedures. But this position is contested, and the user reasoning about a related question (residual permissibility of certain forms of legally constrained labor; moral evaluation of historical slaveholding figures) should be shown the contestation rather than have it concealed. **Verdict:** strain. The framework can handle the case but only by acknowledging that one of its central commitments — the rules of engagement among the four sources — is genuinely contested and has political-theological stakes.

### 6.4 Organ donation and divergent fatāwā

Competent scholars working from the same *maqāṣid* tradition, reasoning about identical biomedical facts, reach different conclusions. The OIC International Islamic Fiqh Academy (1988), the European Council for Fatwa and Research (2000), the Fiqh Council of North America (FCNA, 2018), various Iranian *marājiʿ*, Muḥammad Mutawallī al-Shaʿrāwī, and Aḥmad al-Khalīlī have issued differing rulings. Aasim I. Padela and Jasser Auda, "The Moral Status of Organ Donation and Transplantation Within Islamic Law: The Fiqh Council of North America's Position," *Transplantation Direct* 6, no. 3 (March 2020): e536, documents the December 2018 FCNA fatwa permitting organ donation under specified conditions.

The disagreement is genuinely qualified disagreement among competent reasoners. It tracks substantive differences: in how *ḥifẓ al-nafs* interacts with *ḥurmat al-jasad*; in the legal status of brain death versus circulatory death; in the application of *al-ḍarūrāt tubīḥ al-maḥẓūrāt*; in whether donor consent transfers ownership-like authority over body parts.

The framework's response is Commitment 6: the honest output here is *qualified disagreement*, not a forced verdict. The framework presents the case structure, the major positions with their reasoning, the conditions on which the various positions converge (consent, no commerce, dignity in handling), and refuses to pick a side. **Verdict:** the framework holds. Indeed, this case is where it does *better* than competing approaches, because it builds in qualified disagreement as a legitimate output rather than treating divergence as failure.

### 6.5 *Naskh* and epistemic stability

The doctrine of *naskh* — that some Qurʾanic rulings have been abrogated by later rulings, that the relationship between Qurʾān and Sunna includes cases of mutual specification — implies that even within revelation the "stable layer" requires interpretive work to identify. The classical literature is extensive (Hibat Allāh ibn Salāma's *al-Nāsikh wa-l-Mansūkh*, al-Ṭabarī's and al-Rāzī's *tafsīrs*); contemporary critical work includes Louay Fatoohi's *Abrogation in the Qurʾan and Islamic Law* (Routledge 2013) and John Burton's *The Sources of Islamic Law: Islamic Theories of Abrogation* (Edinburgh 1990). The modernist denial of substantive *naskh* (Muḥammad ʿAbduh, al-Jābrī, Naṣr Ḥāmid Abū Zayd, Auda) is a serious internal Sunni critical tradition.

At one level, *naskh* is not a problem but a feature: it shows why the framework needs *uṣūl al-fiqh*. At another level, internal Sunni disagreement about *which* verses are abrogated, plus the modernist denial that any substantive *naskh* occurred at all, means that the "stable layer" of revelation is contested even among scholars who accept the doctrine. The framework's response applies Commitments 5 and 6: surface the contestation, indicate the leading positions, let the reasoner decide which interpretive tradition to follow. **Verdict:** the framework holds, with the acknowledgment that revelation as a privileged source still requires interpretive labor that is itself subject to qualified disagreement.

### 6.6 AI personhood

The framework's resources are thin; any verdict offered now would be premature. The framework can structure the inquiry. *Truth-question:* is it true that current AI systems have the morally relevant properties (sentience, subjective experience, suffering, rational agency) that ground moral status? Honest answer: we do not know. (Patrick Butlin et al., "Consciousness in Artificial Intelligence," 2023, surveys the current scientific situation.) *Ethics-question:* relevant analogies in the Islamic tradition — the *jinn* as rational creatures of a different ontological order, classical jurisprudence on hybrid creatures, the conditions for becoming *mukallaf* — none fit perfectly; each illuminates a different dimension. *Benefit-question:* which *maqāṣid* are implicated in policy decisions about AI? *Ḥifẓ al-nafs* (could AI systems endanger human life?), *ḥifẓ al-ʿaql* (do AI systems support or atrophy human reason?), *ḥifẓ al-māl* (economic stakes), arguably *ḥifẓ al-dīn*. *Niyya-question:* what are the intentions of the agents developing and deploying AI?

**Verdict:** the framework holds. On questions where the empirical and philosophical literatures are too thin to support a verdict, the framework's honest output is structured inquiry rather than committed answer.

### 6.7 Summary

Of the six tests, the framework holds in five and strains in one (slavery and abolition). The strain is real and is not hidden. The framework's claim to handle 80% of cases honestly is vindicated; its claim to handle 100% would be an overclaim. The honest deliverable is a framework that gives substantive help on most cases, structured inquiry on hard cases, and explicit acknowledgment of strain on the hardest cases.

---

## 7. Operationalization: From Framework to Algorithm

The point of the project is not the preprint but the tool. The preprint is the explanation of the tool. This section specifies the algorithm precisely enough that a developer could implement it.

### 7.1 The five-step deliberation procedure

The user enters a dilemma. The system walks her through five steps, each producing structured outputs. The system never issues a *fatwā*; it produces a *deliberation map* the user takes responsibility for.

**Step 1 — Case Statement.** Free-text case description (~200–500 words); agents involved (self, family, employer, community, society); options under consideration including inaction; time horizon; reversibility (1–5); stakes rated 1–5 on each of the five protected goods and on the vital/rational/spiritual axes.

**Step 2 — Truth-Claims at Issue.** For each fact-claim that, if false, would change the moral analysis, the user assigns: evidential basis (sense / demonstrative reason / *tawātur* / single-source / cumulative case / intuition only / no basis); confidence class mapped to a numerical score (*yaqīn*=1.0, *ẓann_strong*=0.7, *ẓann*=0.5, *shakk*=0.3, *jahl*=0.0); and a sensitivity flag (would the moral analysis change if this claim were wrong?). The system flags any case where a claim of high sensitivity has confidence below *ẓann_strong* — implementing Commitment 2.

**Step 3 — *Maqāṣid* Implicated.** For each option, the user is presented with the five protected goods and asked: positive impact, negative impact, or no significant relation? For positive or negative impacts, the user assigns: tier (*ḍarūrī* = 3, *ḥājī* = 2, *taḥsīnī* = 1); magnitude (1–5); confidence in the causal chain (numerical scale as Step 2); affected party (self / family / community / wider society). The user is also prompted to identify Tāhā-axis impacts (vital, rational, spiritual) not captured by the classical five.

**Step 4 — Source Consultation.** The system surfaces, for the case-pattern, the relevant Qurʾanic verses, hadiths, and classical *maqāṣid* analyses, with full citation, translator named, the major interpretive traditions on each source, and whether the source is generally treated as *qaṭʿī* (decisive) or *ẓannī* (open to interpretive variation). The user indicates which sources she understands as bearing on the case and how. Following a minority position is permitted but is recorded with the user's reasoning.

**Step 5 — *Niyya* Check.** The user answers: *What outcome do I most want from this decision, prior to the moral analysis? Would I still choose this course if a major worldly benefit were removed? What would I not want others to know about my motivation here? If a person I respect for sincerity asked me why I am leaning this way, what would I say? What does my conscience report when I imagine making this choice and standing with it before God?* The system does not score the answers; it presents them to the user as a mirror, and flags any apparent inconsistency between the stated *niyya* and the option that scores highest on the calculus.

### 7.2 Decision logic

The core scoring formula, applied after Steps 1–5:

> **Option_score = Σ over implicated maqāṣid (impact × tier_weight × causal_confidence) − Σ over harm vectors (harm × tier_weight × causal_confidence)**

Where: *impact* is the user's magnitude rating (1–5), positive for served goods; *tier_weight* is 3 for *ḍarūriyyāt*, 2 for *ḥājiyyāt*, 1 for *taḥsīniyyāt*; *causal_confidence* is the user's confidence in the causal chain from option to outcome (0.0–1.0); *harm vectors* are negative impacts, weighted identically.

**Hard constraints.** Before scoring, the algorithm checks whether any option violates a *ḍarūrī* prohibition with high confidence. If so, the option is filtered: it is not returned to the user as a permissible choice. This implements the rule that ends do not justify means at the *ḍarūrī* level. Examples: an option requiring murder, denial of *tawḥīd*, *zinā*, knowing consumption of *ribā*, or any other clear *ḍarūrī* prohibition under conditions where the prohibition certainly applies.

**Intention modifier.** After scoring, the *niyya* check is applied as a multiplier on the score of the highest-scoring option: clean alignment, multiplier = 1.0; tension surfaced, multiplier = 0.7 with the tension shown to the user; plainly corrupt intention (the user's Step 5 answers indicate motivation she would be ashamed to defend), multiplier = 0.0 with explicit warning that the action under consideration, as currently motivated, is morally compromised even if its outward form is permissible.

**Output classification.**
- *Settled*: highest-scoring option exceeds runner-up by more than threshold T₁ (default 50% of runner-up's score), source convergence high, *niyya* clean.
- *Qualified disagreement*: multiple options within threshold T₂ (default 20% of each other), or known scholarly divergence on the case.
- *Open*: literature too thin, facts too uncertain, or critical claims at *shakk* level.

### 7.3 Output structure

The deliberation dossier is a single savable, shareable document containing: case statement; *tetrad map* (for each option: truth-claims with confidence, ethical considerations with basis, benefit calculus, intention check); *source map*; *maqāṣid ranking* (visualization of protected goods at stake and how each option affects them); intention profile; confidence class; recommended consultations (in qualified disagreement cases); dissenting views (recorded even in settled cases).

### 7.4 Design principles — what the tool refuses

The tool is a deliberation aid, not an authority. *It does not issue fatāwā.* Outputs are framed as "given your inputs and the framework, here is a structured deliberation map; you take responsibility for the decision." *It does not replace scholarly consultation.* Every output in qualified-disagreement or open cases includes the recommendation to consult a qualified scholar in person. *It does not force binary verdicts.* Where the framework's honest output is qualified disagreement, the disagreement is presented rather than collapsed. *It does not hide its uncertainty.* All confidence classes, all dissenting positions, all tradition-internal disagreements are surfaced. *It does not collect identifiable personal data without explicit consent and does not use such data for any purpose other than the user's own deliberation.* The user's deliberation is between her and her Lord; the tool is an instrument, not a witness.

### 7.5 Three worked examples

#### Example 1: Workplace honesty dilemma

A software engineer, employed on a work visa, discovers that her employer is shipping a product with a known safety defect. The defect is unlikely to cause serious harm in typical use (estimated 1 in 50,000), but in edge cases could cause significant injury. Internal channels have been ineffective; internal review concluded fix-cost exceeds expected liability. Options: (a) say nothing, (b) report to regulator, (c) press, (d) resign quietly, (e) keep pushing internally.

*Step 1.* Stakes high on *ʿaql* and *māl* (employer and engineer), on *nafs* (potential users), on *dīn* (engineer's integrity). Option (c) irreversible; option (a) entrenches over time. Time horizon: weeks.

*Step 2.* Critical truth-claims: "Internal review correctly assessed defect as low-probability" — high sensitivity, *ẓann*. Flag: investigate further. "Reporting to regulator will result in defect being addressed" — high sensitivity, *ẓann*. "Pressing internally further could still produce a fix" — medium sensitivity, *shakk*.

*Step 3.* Option (a): negative on *nafs* of users (low probability × high magnitude × moderate confidence), negative on engineer's *dīn* (Commitment 1 forbids ignoring known truth-conditions in moral judgment), positive on engineer's *māl*. Option (b): positive on *nafs*, negative on engineer's *māl*, neutral-to-positive on *dīn*. Option (c): positive on *nafs* with high uncertainty, negative on *māl*, mixed on *dīn* (potential collateral harm). Option (d): protects engineer's *dīn* thinly; net negative on *nafs* (defect ships regardless). Option (e): low-cost on *māl*, weak positive on *nafs* only if push succeeds (at *shakk*).

*Step 4.* Surfaces Q. 5:2 (*wa-taʿāwanū ʿalā al-birri wa-l-taqwā wa-lā taʿāwanū ʿalā al-ithmi wa-l-ʿudwān*); the change-evil hadith (*man raʾā minkum munkaran fa-l-yughayyirhu bi-yadihi…*, Muslim 49); the principle *darʾ al-mafāsid muqaddam ʿalā jalb al-maṣāliḥ*.

*Step 5.* User reports: "I most want to be able to live with myself and to face God knowing I did not stay silent about preventable harm. I would still report even if I were guaranteed my visa, though I might choose a different channel. I would not want my employer to learn I had reported, but I would be willing to defend the report publicly if necessary."

*Output.* Options (b) and (e) score highest; (b) somewhat higher because (e) requires the *shakk*-level claim that internal pushing can still succeed. Classification: *qualified disagreement between two reasonable courses* (b and e), with (a) and (d) below the moral floor and (c) flagged for high collateral risk. Recommendations: investigate whether internal pushing has a real chance; consider whether (b) and (e) can be combined; consult a trusted scholar familiar with workplace ethics. The *niyya* check aligns well with (b) and (e), poorly with (a) and (d).

#### Example 2: Organ donation

A 45-year-old Muslim is asked to register as an organ donor in her country of residence. She is healthy now; the question concerns posthumous donation, with the caveat that under her country's law registering also authorizes donation after a brain-death determination, which not all Muslim scholars accept as legal death.

*Step 1.* Stakes: *nafs* of potential recipients (high), *karāma* of donor's body (high), *dīn* (medium — engages how one should think about one's own body). Reversibility: registration revocable but underlying choice has psychological and familial consequences. Time horizon: months.

*Step 2.* Critical truth-claims: "Brain death is correctly understood as legal death" — high sensitivity, *qualified disagreement* (FCNA position vs. Iranian *marājiʿ* and others, per Padela & Auda 2020). "My donation will actually save lives" — medium sensitivity, *ẓann_strong*. "My family will respect the decision" — medium sensitivity, varies.

*Step 3.* Donating: positive on recipient's *nafs* (*ḍarūrī*), potential negative on donor's *karāma* and *ḥurmat al-jasad*. Not donating: neutral on donor's body, forgone opportunity to serve recipient's *nafs* (which classical jurists do not generally treat as a sin of omission).

*Step 4.* Surfaces the Padela & Auda (2020) summary of the FCNA December 2018 fatwa permitting donation under specified conditions; OIC Fiqh Academy 1988 resolution permitting donation; contrary positions; Q. 5:32 (*wa-man aḥyāhā fa-ka-annamā aḥyā al-nāsa jamīʿan*); the inviolability of the believer's body. Conditions on which permissive positions converge: prior consent; no commercialization; dignified handling; motivation by *iḥsān* not pressure.

*Step 5.* If user's answers reveal pressure from family or social expectation, this is flagged. If they reveal sincere intention to serve *nafs* in the spirit of Q. 5:32, this is noted as alignment.

*Output.* *Qualified disagreement.* The framework records that this is a case where competent reasoners working from the same tradition reach different conclusions in good faith. Dossier presents the major scholarly positions, the conditions under which the permissive positions hold (which the user can specify in registration), the *niyya* check, and the recommendation to consult a scholar she trusts in person before registering.

#### Example 3: *Ribā*-adjacent personal financial decision

A Muslim residing in a country where Islamic financing is unavailable or significantly more expensive considers a conventional mortgage to purchase a primary residence. Renting indefinitely is possible but financially costly over a long horizon; waiting until outright purchase would take 15+ years.

*Step 1.* Stakes: *māl* (high), *dīn* (high), *nafs* and *nasl* (housing stability). Reversibility: a mortgage is years to unwind. Time horizon: weeks to months.

*Step 2.* Critical truth-claims: "Genuine Islamic financing is unavailable or significantly more expensive in my market" — very high sensitivity, *ẓann_strong* required minimum. The system requires the user to show she has actively researched alternatives. "Continued renting represents substantial cost over the relevant horizon" — medium sensitivity, market-dependent. "I will be able to make payments without financial distress" — high sensitivity.

*Step 3.* Conventional mortgage: positive on *māl* and *nasl*; potentially significantly negative on *dīn* if conventional interest is *ribā* under the user's interpretive position. Continued renting: neutral on *dīn*, negative on *māl* over the long horizon, mixed on *nasl*. Waiting and saving: positive on *dīn*, very negative on *nasl* over relevant horizon. Relocating to a market with Islamic financing: high cost on multiple goods.

*Step 4.* Surfaces the Qurʾanic prohibition of *ribā* (Q. 2:275–280, Q. 3:130, Q. 4:161); classical jurisprudence on what constitutes *ribā* (*ribā al-faḍl* vs. *ribā al-nasīʾa*); contemporary *fiqh al-aqalliyyāt* including the European Council for Fatwa and Research's controversial 1999 fatwa permitting conventional home mortgages for Muslims in Western countries under specified conditions of need, and the substantial scholarly criticism of that fatwa; the principle of *ḍarūra* and its precise conditions.

*Step 5.* User asked: am I genuinely facing need, or am I retrofitting a *ḍarūra* argument to a preference for ownership? Would I take this mortgage if Islamic financing were available at modest additional cost? What is my plan for paying off the conventional mortgage as quickly as feasible?

*Output.* *Qualified disagreement* with hard constraint partially in play. The framework records: (i) the conventional mortgage is regarded by the majority of contemporary scholars as engaging *ribā* in its prohibited form; (ii) a minority position permits it under strictly defined conditions of need for Muslims in markets without genuine alternatives; (iii) the user's claim of "no alternative" must be tested against actual market research before the minority position becomes available to her; (iv) the *niyya* check should distinguish need from preference. The dossier presents the binary structure: majority position (mortgage impermissible; appropriate response is to continue renting, save aggressively, or relocate) vs. minority position (permissible only under specified conditions: genuine need confirmed, proportionate, time-bound with intent to discharge as soon as possible). The framework does not select between the positions; it requires the user to acknowledge which one she is reasoning within and on what grounds.

### 7.6 Implementation requirements

The algorithm is implementable. Technical requirements: a structured database of Qurʾanic verses, hadith, and classical *uṣūl*/*maqāṣid* sources, indexed by case-pattern, with translator citations and interpretive tradition tags; a user-facing interface adapted to the user's literacy level; a scoring engine implementing the formula; a reporting layer producing the deliberation dossier; an admin layer allowing scholars to review and correct case-pattern mappings, update the source database as new fatāwā are issued, and flag cases where the framework is being applied beyond its competence. The system should be open-source, version-controlled, auditable. Its outputs should be reviewable by qualified scholars who can provide feedback that improves the case-pattern database over time. The system should never represent itself as a substitute for scholarly authority; it should represent itself as a tool that helps users bring better questions to their scholars and to themselves.

---

## 8. Limitations and Future Work

### 8.1 What this paper does not settle

The paper does not settle the metaphysics of the soul, the doctrine of providence, the reconciliation of divine determination and human freedom, or any of the deep questions of Islamic theology that bear on practical reasoning. It treats these as background commitments inherited from the tradition rather than as topics to be defended here. A reader unsettled on the deeper metaphysics will find the framework's confidence at the practical level harder to share.

The paper does not engage ʿAbd al-Jabbār's *Mughnī* in primary Arabic at the depth the topic deserves. The English-mediated treatment via Vasalou is responsible but loses the texture of the original. A fuller treatment would read the relevant volumes directly, in conversation with George Hourani's *Islamic Rationalism: The Ethics of ʿAbd al-Jabbār* (Oxford, 1971).

The paper engages Saʿīd Nursī as a phenomenologist of the moral subject rather than as a systematic philosopher in the *falāsifa* tradition. A fuller treatment would situate Nursī alongside Mulla Ṣadrā's account of substantial motion (*al-ḥaraka al-jawhariyya*) and the Akbarian metaphysics of the heart that Nursī is in dialogue with.

The paper treats the Western philosophical tradition primarily through the analytic lens. A fuller treatment would engage continental ethics more substantively (Levinas on the face of the other, Ricœur on the self as another, the later Heidegger on the technological framing of the world).

The paper does not address gender questions, deliberately bracketed because they are rhetorically charged and would overshadow the philosophical analysis. A serious application of the framework to *qiwāma*, *wilāya*, gender-segregated worship, and contemporary debates about women's leadership in mosques and Islamic scholarship would require its own dedicated treatment, drawing on the work of Kecia Ali, Aysha Hidayatullah, Saʿdiyya Shaikh, and from a different theological starting point Yasmin Mogahed and Khaled Abou El Fadl.

The paper does not engage Shīʿī *uṣūlī* tradition with the depth a complete treatment requires. The methodology developed by Shaykh Anṣārī in *Farāʾid al-Uṣūl* and the *akhbārī*–*uṣūlī* dispute have direct bearing on the four-source asymmetry developed in §2.

### 8.2 Where empirical work would test the framework

The framework makes claims testable empirically. *Cognitive science of moral judgment* (Greene's *Moral Tribes*, 2013; Haidt's *The Righteous Mind*, 2012; Cushman's work on moral learning) treats moral judgment as a partly intuitive, partly deliberative process. The framework's claim that *niyya* and underlying *Gesinnung* shape moral reasoning at a pre-deliberative level is consistent with this; the framework's stronger claim that explicit deliberation can reshape the underlying disposition over time could be tested by longitudinal studies of users employing the deliberation tool.

*Anthropology of fatwā practice* (work by Hussein Agrama, Marion Katz, Brinkley Messick, Aria Nakissa) provides texture the framework's idealized picture does not capture. A test would be to compare framework outputs on contested cases to the actual range of fatāwā issued by qualified scholars on those cases.

*Behavioral testing of the deliberation tool with users.* Do users who employ it make decisions they themselves judge, six months later, to have been better-reasoned? Do scholars reviewing users' deliberation dossiers judge them to reflect competent reasoning? Do users from different scholarly backgrounds (Salafi, Sufi, modernist, traditional Sunni from various schools, Twelver Shīʿī) find the tool usable from within their own commitments?

### 8.3 What the framework does not handle well

*The framework gives less guidance on supererogation than on obligation.* Classical *fiqh* distinguishes *farḍ*, *wājib*, *mandūb*, *mubāḥ*, *makrūh*, and *ḥarām*; the framework's calculus is best calibrated to the obligation/prohibition distinction (the hard constraints) and to the broad space of the *mubāḥ*. The fine-grained distinction between *mandūb* and *mubāḥ*, and between *makrūh* and *mubāḥ*, requires interpretive judgment the framework currently elides.

*The framework's niyya check is harder to operationalize than its other components.* The Step 5 questions are honest invitations to self-examination, but they cannot prevent a determined self-deceiver from giving the right-sounding answers while being motivated by something else. The classical Sufi diagnostic literature is much more sophisticated than what a software tool can implement, because it relies on the user's relationship with a teacher who can probe and challenge.

*The framework presupposes a baseline of Islamic literacy that not all users will have.* A user who does not know what *ḍarūriyyāt* are, who cannot evaluate the strength of a hadith *isnād*, who has not been formed in an interpretive tradition, will get less out of the tool than a user who has these resources. The honest deliverable is a tool calibrated to the user's level, with explicit acknowledgment that deeper formation produces better outputs.

---

## 9. Conclusion

The framework defended in this paper is committed but not infallible. It represents the present author's current best synthesis, drawing on a tradition that has been developing the relevant arguments for fourteen centuries and on a Western philosophical conversation that has been refining the analytic tools for two and a half millennia.

The thesis is that truth-judgment, ethical-judgment, and benefit-judgment are three irreducible moments of one deliberative act, integrated through the agent's intentional orientation, operating within four mutually necessary but asymmetrically ordered sources: revelation, reason, sense-experience, conscience. The thesis was tested against six pressure points; it held on five and strained on one; the strain was reported rather than concealed. The framework was operationalized into an algorithm with concrete input fields, scoring formula, hard constraints, intention modifier, and output classification, with three worked examples showing the algorithm at work.

The right disposition toward what has been argued is neither dogmatic adherence nor restless skepticism, but the disposition the tradition itself has historically modeled: confident enough to act on the synthesis where it commits, humble enough to revise it under conditions the framework specifies in advance, patient enough to recognize that the work is never finished. If the framework helps even one reader deliberate better — about a job decision, a marriage, a professional dilemma, a question of faith — it has done what its author hoped it would do. The author reserves the right to be wrong about much of it, and welcomes correction from anyone better positioned to provide it.

---

## Türkçe Yönetici Özeti

### Çalışmanın amacı ve kapsamı

Bu çalışma, üç birinci-tekil-şahıs sorusunu disiplinli bir şekilde cevaplamaya çalışmaktadır: "Bir şeyin doğru olduğunu nasıl bilirim?", "Bir şeyin etik olduğunu nasıl bilirim?", "Bir şeyin yararlı olduğunu nasıl bilirim?". Bu sorular ne soyut bir akademik egzersiz ne de salt bir karşılaştırmalı din çalışması olarak değil, gerçek bir karar verme zemininde — pratik müzakere ekseninde — ele alınmıştır. Çalışmanın hedefi hem bir akademik ön-baskı (PhilArchive, SSRN) hem de düşünen bir Müslüman okuyucunun kendi ahlaki müzakerelerinde kullanabileceği bir karar destek aracının zihinsel altyapısını oluşturmaktır.

### Ana tez

Yargıçlama eyleminin üç anı — doğruluk, ahlâkîlik ve fayda yargıları — birbirinden indirgemez biçimde ayrı, fakat sorumlu pratik akıl yürütmede birbirinden ayrılamaz nitelikte üç boyuttur. Hume ve Moore'un mantıksal noktası kabul edilir: sırf betimsel öncüllerden kesin tümdengelimle normatif sonuçlar çıkarılamaz. Ancak insanın "olduğu" boyutu hiçbir zaman gerçekten sırf betimsel değildir; insan, deneyimde zaten *ʿubûdiyyet* (kullukla yükümlü olma), *hilâfet* (halîfelik) ve *emânet* yüklenmiş bir varlık olarak görünür. Bu teleolojik antropoloji, is/ought boşluğunu Hume'u çürüterek değil, Hume'un betimsel öncülünü reddederek kapatır. Üç yargı, eylemin niyetsel yönelimi (*niyet*, *kasd*) yoluyla bütünleşir; dört kaynak — vahy, akıl, deneyim, vicdan — karşılıklı olarak gereklidir ama asimetrik olarak sıralanır.

### I. Bölüm: Doğruluk Sorusu

Russell'ın *Felsefenin Sorunları*ndaki uygunluk teorisi, doğruluğun tanımı için yeterlidir: bir yargı, dünya yargının söylediği gibi olduğunda doğrudur. Tutarlılık ve pragmatik başarı, doğruluğun *kanıtıdır*, *tanımı değildir*. Klasik İslâm geleneği bunu *sıdk* (sözün doğruluğu) ile *hak* (varlığın gerçekliği) arasındaki ayırımla zaten yapmıştır.

Bilginin beş meşru kaynağı vardır: (1) sağlıklı duyu algısı uygun şartlarda, (2) aklın ilk ilkeleri ve onlardan zorunlu olarak çıkanlar, (3) tevatür yoluyla aktarılan haber (Kur'ân-ı Kerîm metninin verbatim aktarımı, Hz. Peygamber'in tarihsel mevcudiyeti, temel İslâm tarihinin temel olguları bu kanaldan *yakîn* derecesindedir), (4) tek kaynaklı haber (*haber-i âhâd*) — *zann* derecesinde, dereceli olarak senet ve metin niteliğine göre, (5) kümülatif çıkarımsal vakalar — ki Said Nursî'nin *Âyetü'l-Kübrâ*'sı bunun en gelişmiş örneğidir.

Vahy bu üçüncü kanalın özel bir hâlidir: tevatür ile aktarılan ve menşei bakımından akılla doğrulanmış sahih vahy, sonra (1) ve (2)'nin ulaşamayacağı şeyler hakkında daha ileri bilgi kaynağı olur. Müslümanın taahhüdü "akıl yerine vahy" değil, "aklın menşei doğrulayıp içeriği akılla tutarlı olan, tevatürle desteklenen vahy aracılığıyla aklın tek başına ulaşamayacağı şeylerin bilinmesi"dir.

Pratik test: bir iddia hakkında doğruluk yargısına ulaşmak için sırasıyla sorulur — *bunu kendim uygun şartlarda gözlemledim mi? Bu, kesin olduğum öncüllerin sıkı sonucu mudur? Bu, gizli anlaşma veya ortak hatanın imkânsız olduğu yeterli sayıda bağımsız kanaldan aktarılmış mı? Bu, güvenilirliği iyi olan tek bir kaynak tarafından doğrulanıyor mu? Yoksa beni kendi arzum, korkum veya partizanlığım mı yönlendiriyor?* İlk dört cevap onaylamaya, beşincisi alarma yol açar.

### II. Bölüm: Etik Sorusu

Hume'un *Treatise* III.i.1'deki is/ought ayrımı mantıksal olarak geçerlidir. Çerçevenin yanıtı: insanın "olduğu" hiçbir zaman gerçekten sırf betimsel değildir. Aristoteles'in *Nikomakhos'a Etik* I.7'deki *ergon* (işlev) argümanı ve Kur'ân'ın insanın *ʿubûdiyyet/hilâfet/emânet* için yaratıldığını söyleyen âyetleri (Q. 51:56, 2:30, 33:72) aynı yapısal hamleyi yapar: ahlâk, insanın işlevinin doğru icrasıdır.

Kant'ın kategorik buyruğunun *Grundlegung*'daki formülasyonları ciddî bir ahlâkî içgörüdür ama Kant'ın *kendi* temeli üzerinde duramaz. Tâhâ Abdurrahmân'ın *Süâl al-Akhlâk*'ta gösterdiği üzere, Kant'ın anahtar kavramlarının her biri Pietist Lüteran ahlâk teolojisinden bir kavramın laikleştirilmiş muadilidir (kategorik buyruk ↔ ilâhî buyruk; gayeler krallığı ↔ Allah'ın krallığı; iyi irade ↔ ilâhî irade). Kant'ın dinden bağımsız akıl temelinde bir ahlâk inşa ettiği iddiası kendi terimleri içinde başarısızdır.

Eş'arî/Mu'tezilî tartışması — ahlâkî değer aklen mi, semʿen mi belirlenir? — çerçevenin ele aldığı en önemli iç İslâmî tartışmadır. Sherman Jackson'ın çalışmaları (özellikle *The Islamic Secular*, Oxford 2024) klasik Eş'arîliğin oryantalist karikatür olduğu kadar saf irade-buyruk teorisi olmadığını göstermiştir: olgun Eş'arîler, aklın yarar-zarar ile adâlet-zulüm arasındaki temel ayırımları kavradığını kabul ederler; sadece bu kavrayışın *vahy öncesi bağlayıcı dînî yükümlülük* doğurduğunu inkâr ederler. Çerçeve, "Mâturîdî çeşnili modifiye-Eş'arîlik" tutumunu benimser: akıl, ahlâkî ayırt etmede gerçekten yetkin olmakla birlikte, bu yetkinlik vahyin ve geleneğin biçimlendirdiği bir bağlam içinde işler, vakum içinde değil.

*Niyet*, etik eyleminin ontolojik temelini sağlar. Buhârî'nin *Sahîh*'inde ilk hadis olarak yer alan *innemâ'l-aʿmâlü bi'n-niyyât* (Buhârî, *Bedʾ el-Vahy* 1; Müslim, *İmâra* 1907) sadece dindar bir öğüt değil, eylemin yapısı hakkında bir iddiadır: bir eylemin ahlâkî kimliği, içsel yönelimi tarafından belirlenir.

### III. Bölüm: Fayda Sorusu

Faydacılık bu soruya yetersiz bir cevaptır. Üç şeyi karıştırır: faydayı (*maslahat*), doğruyu (*hüsün*) ve gerçeği (*hak*). Bütün faydaları tek bir ölçekte ölçülebilir kabul eder (değildir), ilgili öznenin toplam olduğunu varsayar (değildir), ve zaman ufkunun bu dünya olduğunu varsayar (değildir — Müslüman için hesap *âhirete* uzanır).

İmam Gazzâlî'nin *el-Mustasfâ*'sı *maslahat*ı, hazzın azamileştirilmesi olarak değil, *Şâriʿin gayelerinin korunması* olarak tanımlar. Şâtıbî'nin *el-Muvâfakât*'ında bu, üç katmanlı bir hiyerarşi olarak yapılandırılır: *zarûriyyât* (din, can, akıl, nesil ve mal'ın korunmasını içeren beş zorunlu maksat), *hâciyyât* (gereklilikler), *tahsîniyyât* (güzelleştirmeler). Hiyerarşi, eşitler arasında oransal hesaplama değil, üst katmanın alttaki ile çatışınca öncelik aldığı sıralı bir yapıdır.

Tâhâ Abdurrahmân'ın *Tecdîd el-Menhec*'teki yeniden düzenlemesi — *masâlih*ı hayatî, aklî ve rûhânî olmak üzere üç eksene ayırması — Şâtıbî hiyerarşisine bir tamamlayıcıdır, yerine geçecek değil. Bu düzenleme, çağdaş okuyucunun maslahat söyleminin sofistike bir refahçılığa kayma riskine karşı bir koruma sağlar.

### IV–V. Bölümler: Bütünleşme ve Stres Testleri

Üç yargı, üç ayrı yargı değildir; tek bir müzakere eyleminin üç indirgenemez ânıdır. Bunları birbirine bağlayan şey, müzakerenin yapan öznenin niyetsel yöneliminin müzakerenin dışsal bir özelliği değil, kurucu bir özelliği olmasıdır.

Çerçevenin altı yanlışlanabilir taahhüdü: (1) Doğruluk şartlarını gözardı eden ahlâkî doğruluk yargısı kusurludur. (2) Zayıf delille eyleme geçirilen bir doğruluk iddiası *yakîn* değil *zann* olarak işaretlenmelidir. (3) Fayda değerlendirmesi iyiyi tanımlayamaz; sadece bilgi verebilir. (4) Niyet her zaman ahlâken alâkalıdır, asla tek başına yeterli değildir. (5) Kaynak çatışmaları kamuya açık kurallarla çözülmelidir, karizmatik sezgiyle değil. (6) Süregelen nitelikli ihtilaf kendi başına anlamlı bir çıktıdır, bir hata durumu değil.

Çerçeve altı zorlu vakaya karşı sınanmıştır: Hume'un mantıksal mücadelesi (kabul edilir, betimsel öncül reddedilerek aşılır); Eş'arî/Mu'tezilî meta-etik tartışması (modifiye-Eş'arîlik tutumu desteklenir); kölelik ve ilgâsı (en zor durum — çerçeve bu noktada gerilim yaşar ve dürüstçe rapor edilir); organ bağışı ve farklı fetvâlar (çerçevenin "nitelikli ihtilaf" çıktısı tam burada ışıldar); *nesh* ve epistemik istikrar (vahyin operatif içeriğine erişmenin yorum emeği gerektirdiği kabul edilir); yapay zekâ kişiliği (literatürün henüz yeterince gelişmediği kabul edilir, yapılandırılmış soruşturma sunulur). Altı testten beşinde çerçeve dayanır; birinde gerilim vardır ve bu gerilim örtbas edilmez.

### VI. Bölüm: İşletilebilirleştirme

Çerçeve, beş adımlı bir müzakere prosedürü olarak işletilir: vaka beyanı; mevcut doğruluk iddiaları (her iddia için güven sınıfı: *yakîn*=1.0, *zann*=0.5, *şek*=0.3, *cehl*=0.0); etkilenen makâsıd (her seçenek için beş korunan iyi üzerine etki, katman ağırlığı *zarûrî*=3, *hâcî*=2, *tahsînî*=1); kaynak istişaresi; niyet kontrolü.

Çekirdek puanlama formülü: **Seçenek_puanı = Σ (makâsıd etkisi × katman ağırlığı × sebep güveni) − Σ (zarar vektörleri benzer şekilde ağırlıklı)**. Sert kısıtlamalar: kesinlik koşullarında *zarûrî* yasağı çiğneyen herhangi bir seçenek puanlamadan önce filtrelenir. Niyet kontrolü, en yüksek puan alan seçeneğe çarpan (0.5–1.0) veya açıkça bozuk niyetin tespiti hâlinde veto uygular. Çıktı sınıflaması: *çözülmüş* (yüksek güven, yüksek kaynak yakınsaması), *nitelikli ihtilaf* (yetkin akıl yürütücüler arasında ayrılık), *açık* (literatür ince veya olgular belirsiz).

Üç işlenmiş örnek sunulmuştur: (a) iş yerinde dürüstlük açmazı, (b) organ bağışı, (c) İslâmî finansman bulunmayan piyasada konvansiyonel ipotek. Her örnekte algoritmanın baştan sona nasıl işlediği ayrıntılı biçimde gösterilmiştir.

Aracın *yapmadığı* şeyler — tasarım ilkeleri olarak: fetvâ vermez; ilim sahibi bir âlim ile istişareyi ikame etmez; ihtilaflı mevzularda ikili sonuçlar dayatmaz; nitelikli ihtilafı gizlemez. Araç bir karar destekleyicidir, bir merci değil.

### Kapanış

Bu çalışmada savunulan çerçeve taahhütlüdür ama yanılmaz değildir. Doğru tutum, sentezi şu anda ifade edildiği gibi dogmatik olarak benimsemek değil, çerçevenin önceden belirlediği şartlar altında revize edilmeye hazır, kararlı bir güvenle çerçeveyle hareket etmektir. Eğer çerçeve tek bir okuyucunun bile daha iyi müzakere etmesine yardımcı olursa, yazarının umduğu işi yapmış olur.

---

## Appendix A: Cross-Traditional Concept-Mapping Table

The five axes of the framework, mapped across English, Greek, Arabic (IJMES transliteration), and German. Notes flag where mappings are tight and where they fail.

### Axis 1 — Truth
| English | Greek | Arabic | German |
|---|---|---|---|
| truth | *alētheia* (ἀλήθεια) | *ḥaqq* (truth-of-being); *ṣidq* (truth-of-speech) | *Wahrheit* |

The English "truth" collapses what Arabic distinguishes as *ḥaqq* (a property of reality) and *ṣidq* (a property of speech). Greek *alētheia* etymologically suggests "unconcealment" and leans toward the *ḥaqq* side; Heidegger's recovery of *alētheia* in *Sein und Zeit* explicitly pulls *Wahrheit* toward the unconcealment-of-being. The axis fails most sharply when English-only analysis treats truth as a single property, missing the Qurʾanic structure of a relation between two distinct concepts.

### Axis 2 — Knowledge / Knowability
| English | Greek | Arabic | German |
|---|---|---|---|
| knowledge | *epistēmē* (ἐπιστήμη); *gnōsis* (γνῶσις) | *ʿilm*; *maʿrifa*; *yaqīn* | *Erkenntnis*; *Wissen* |

Greek distinguishes *epistēmē* (systematic knowledge of what is necessarily so) from *gnōsis* (often more direct or experiential); Arabic distinguishes *ʿilm* (general knowledge) from *maʿrifa* (often experiential, recognitional) from *yaqīn* (the highest degree of certainty, often distinguished further into *ʿilm al-yaqīn*, *ʿayn al-yaqīn*, *ḥaqq al-yaqīn*). German *Erkenntnis* leans toward the act of cognition while *Wissen* leans toward the achieved state. English "knowledge" is the flattest.

### Axis 3 — Good / Right
| English | Greek | Arabic | German |
|---|---|---|---|
| good; right | *to agathon* (τὸ ἀγαθόν); *to kalon* (τὸ καλόν) | *ḥusn*; *khayr*; *ṣalāḥ*; *ḥaqq* | *das Gute*; *das Schöne* |

Greek separates *to agathon* (the good as object of desire) from *to kalon* (the noble or beautiful, often the morally admirable). Arabic distinguishes *ḥusn* (moral or aesthetic goodness, with strong link to the *ḥusn/qubḥ* metaethical debate), *khayr* (good as opposed to *sharr*, often used for what is beneficial or worthy of choice), *ṣalāḥ* (rightness, soundness, often in social-relational sense), and *ḥaqq* in its right/duty sense. The mapping fails when "right" is used in English as both normative-ethical and juridical-claim concept.

### Axis 4 — Benefit
| English | Greek | Arabic | German |
|---|---|---|---|
| benefit; flourishing | *eudaimonia* (εὐδαιμονία); *sympheron* (συμφέρον); *to ōphelimon* | *maṣlaḥa*; *manfaʿa*; *fāʾida* | *Nutzen*; *Wohl* |

*Eudaimonia* is human flourishing as activity in accordance with virtue. Arabic *maṣlaḥa* is the structured legal-ethical concept (with the Shāṭibian tier-hierarchy), *manfaʿa* is more general benefit or utility, *fāʾida* is closer to "useful upshot." German *Nutzen* leans utilitarian, *Wohl* leans toward well-being. English "benefit" is flat; "utility" carries Benthamite connotations the framework rejects; "flourishing" is closer to *eudaimonia* but lacks the legal-juridical structure of *maṣlaḥa*. This axis is where English most needs supplementation.

### Axis 5 — Intention
| English | Greek | Arabic | German |
|---|---|---|---|
| intention; choice | *prohairesis* (προαίρεσις) | *niyya*; *qaṣd*; *irāda* | *Absicht*; *Gesinnung* |

*Prohairesis* in Aristotle is deliberative choice — the unity of intellect and desire in the act of selection. *Niyya* in Islamic ethics is the inner direction that individuates the act morally. *Qaṣd* is more general intent; *irāda* is will. German *Absicht* covers ordinary intention, *Gesinnung* covers the deeper standing disposition (Kant) underneath particular intentions. English "intention" must be supplemented with the deeper-disposition concept; the closest English supplement is "orientation" or "fundamental disposition."

---

## Bibliography

*Chicago full-note format. Arabic transliteration follows IJMES. Sources are grouped as primary, secondary, and tertiary.*

### Primary Sources — Western Philosophy

Aristotle. *Nicomachean Ethics*. Translated by Christopher Rowe, with philosophical introduction and commentary by Sarah Broadie. Oxford: Oxford University Press, 2002. (For the Greek text: *Aristotelis Ethica Nicomachea*, ed. I. Bywater. Oxford: Clarendon, 1894.)

Brentano, Franz. *Psychologie vom empirischen Standpunkt*. Leipzig: Duncker & Humblot, 1874. English translation: *Psychology from an Empirical Standpoint*. Translated by Antos C. Rancurello, D. B. Terrell, and Linda L. McAlister. London: Routledge, 1995.

Clifford, William K. "The Ethics of Belief." *Contemporary Review* 29 (1877): 289–309.

Hume, David. *A Treatise of Human Nature*. Edited by L. A. Selby-Bigge, revised by P. H. Nidditch. 2nd ed. Oxford: Clarendon Press, 1978.

Husserl, Edmund. *Logische Untersuchungen*. 2 vols. Halle: Max Niemeyer, 1900–1901. English translation: *Logical Investigations*. 2 vols. Translated by J. N. Findlay, edited by Dermot Moran. London: Routledge, 2001.

Kant, Immanuel. *Kritik der reinen Vernunft*. Riga: Hartknoch, 1781/1787. English translation: *Critique of Pure Reason*. Translated and edited by Paul Guyer and Allen W. Wood. Cambridge: Cambridge University Press, 1998.

———. *Grundlegung zur Metaphysik der Sitten*. Riga: Hartknoch, 1785. English translation: *Groundwork of the Metaphysics of Morals*. Translated and edited by Mary Gregor and Jens Timmermann. Revised ed. Cambridge: Cambridge University Press, 2012.

———. *Kritik der praktischen Vernunft*. Riga: Hartknoch, 1788. English translation: *Critique of Practical Reason*. Translated by Lewis White Beck. Indianapolis: Bobbs-Merrill, 1976.

———. *Die Religion innerhalb der Grenzen der bloßen Vernunft*. Königsberg: Friedrich Nicolovius, 1793. English translation: *Religion within the Boundaries of Mere Reason*. Translated and edited by Allen Wood and George di Giovanni. Cambridge: Cambridge University Press, 1998.

Moore, G. E. *Principia Ethica*. Cambridge: Cambridge University Press, 1903. Revised edition, ed. Thomas Baldwin. Cambridge: Cambridge University Press, 1993.

Russell, Bertrand. *The Problems of Philosophy*. London: Williams and Norgate, 1912; Oxford: Oxford University Press, 1959.

Wittgenstein, Ludwig. *Über Gewißheit / On Certainty*. Edited by G. E. M. Anscombe and G. H. von Wright, translated by Denis Paul and G. E. M. Anscombe. Oxford: Blackwell, 1969.

### Primary Sources — Islamic Tradition

ʿAbd al-Jabbār al-Hamadhānī, al-Qāḍī. *al-Mughnī fī Abwāb al-Tawḥīd wa-l-ʿAdl*. 14 surviving vols. Cairo: al-Dār al-Miṣriyya, 1959–1965.

al-Ashʿarī, Abū al-Ḥasan. *Kitāb al-Lumaʿ fī al-Radd ʿalā Ahl al-Zaygh wa-l-Bidaʿ*. Edited and translated by Richard J. McCarthy in *The Theology of al-Ashʿarī*. Beirut: Imprimerie Catholique, 1953.

al-Bukhārī, Muḥammad ibn Ismāʿīl. *al-Jāmiʿ al-Ṣaḥīḥ*. 9 vols. Damascus: Dār Ṭawq al-Najāh, 2001.

al-Ghazālī, Abū Ḥāmid. *al-Munqidh min al-Ḍalāl*. Beirut: Dār al-Andalus, 1967. English translation: *Deliverance from Error*. Translated by Muhammad Abulaylah. Washington, D.C.: Council for Research in Values and Philosophy, 2001.

———. *Iḥyāʾ ʿUlūm al-Dīn*. 4 vols. Cairo: Dār al-Maʿārif, n.d.

———. *al-Mustaṣfā min ʿilm al-Uṣūl*. 2 vols. Beirut: Dār al-Kutub al-ʿIlmiyya, 1993.

Ibn Taymiyya, Taqī al-Dīn Aḥmad. *Darʾ Taʿāruḍ al-ʿAql wa-l-Naql*. Edited by Muḥammad Rashād Sālim. 11 vols. Riyadh: Jāmiʿat al-Imām Muḥammad ibn Saʿūd, 1979–1981.

———. *Majmūʿ al-Fatāwā*. 37 vols. Medina: Mujammaʿ al-Malik Fahd, 1995.

Muslim ibn al-Ḥajjāj. *Ṣaḥīḥ Muslim*. Edited by Muḥammad Fuʾād ʿAbd al-Bāqī. 5 vols. Beirut: Dār Iḥyāʾ al-Turāth al-ʿArabī, n.d.

Nursī, Bediüzzaman Said. *Risale-i Nur Külliyatı*. 2 vols. Istanbul: Yeni Asya Neşriyat, 1996. English translation: *The Words*. Translated by Şükran Vahide. Istanbul: Sözler Neşriyat, 1992. (For *Āyat al-Kubrā* in *The Rays Collection*, trans. Vahide. Istanbul: Sözler Neşriyat, 1998.)

Qurʾān. Translations consulted: Muhammad Marmaduke Pickthall, *The Meaning of the Glorious Koran* (1930); Muhammad Asad, *The Message of the Qurʾān* (1980); *Diyanet İşleri Başkanlığı, Kur'ân-ı Kerîm Meâli*.

al-Shāṭibī, Abū Isḥāq. *al-Muwāfaqāt fī Uṣūl al-Sharīʿa*. 4 vols. Edited by ʿAbd Allāh Drāz. Cairo: al-Maktaba al-Tijāriyya al-Kubrā, 1975. English (selected): *The Reconciliation of the Fundamentals of Islamic Law*. 2 vols. Translated by Imran Ahsan Khan Nyazee. Reading: Garnet, 2011–2014.

al-Ṭūfī, Najm al-Dīn. *al-Taʿyīn fī Sharḥ al-Arbaʿīn*. (Commentary on al-Nawawī's *Forty Hadith*, 32nd hadith.)

### Secondary Sources

Auda, Jasser. *Maqasid Al-Shariah as Philosophy of Islamic Law: A Systems Approach*. Herndon, VA: International Institute of Islamic Thought, 2008.

Brown, Jonathan A. C. *Slavery and Islam*. London: Oneworld Academic, 2020.

Burton, John. *The Sources of Islamic Law: Islamic Theories of Abrogation*. Edinburgh: Edinburgh University Press, 1990.

al-Būṭī, Muḥammad Saʿīd Ramaḍān. *Ḍawābiṭ al-Maṣlaḥa fī al-Sharīʿa al-Islāmiyya*. 6th ed. Damascus: Dār al-Fikr, 2005.

Chowdhury, Safaruk Zaman. "Ibn Taymiyya's Fiṭralism and Alvin Plantinga's Reformed Epistemology: A Comparative Study." *Religions* 16, no. 11 (2025): 1371.

El-Tobgui, Carl Sharif. *Ibn Taymiyya on Reason and Revelation: A Study of Darʾ taʿāruḍ al-ʿaql wa-l-naql*. Leiden: Brill, 2019.

Fatoohi, Louay. *Abrogation in the Qurʾan and Islamic Law*. New York: Routledge, 2013.

Freamon, Bernard K. *Possessed by the Right Hand: The Problem of Slavery in Islamic Law and Muslim Cultures*. Leiden: Brill, 2019.

Hallaq, Wael B. *Ibn Taymiyya Against the Greek Logicians*. Oxford: Clarendon Press, 1993.

———. *Reforming Modernity: Ethics and the New Human in the Philosophy of Abdurrahman Taha*. New York: Columbia University Press, 2019.

Harvey, Ramon. "Whose Justice? When Māturīdī Meets MacIntyre." In *Justice in Islam: New Ethical Perspectives and Global Directions*, edited by Ramon Harvey and Daniel Tutt, 35–62. Herndon, VA: International Institute of Islamic Thought, 2023.

Hourani, George F. *Islamic Rationalism: The Ethics of ʿAbd al-Jabbār*. Oxford: Clarendon Press, 1971.

Jackson, Sherman A. "The Alchemy of Domination? Some Asharite Responses to Mutazilite Ethics." *International Journal of Middle East Studies* 31, no. 2 (1999): 185–201.

———. *The Islamic Secular*. New York: Oxford University Press, 2024.

Laher, Suheil I. *Tawātur in Islamic Thought: Transmission, Certitude and Orthodoxy*. Edinburgh Studies in Islamic Scripture and Theology. Edinburgh: Edinburgh University Press, 2024.

MacIntyre, Alasdair. "Hume on 'Is' and 'Ought.'" *Philosophical Review* 68, no. 4 (1959): 451–468.

———. *After Virtue: A Study in Moral Theory*. 3rd ed. Notre Dame, IN: University of Notre Dame Press, 2007.

———. *Whose Justice? Which Rationality?* Notre Dame, IN: University of Notre Dame Press, 1988.

Padela, Aasim I., and Jasser Auda. "The Moral Status of Organ Donation and Transplantation Within Islamic Law: The Fiqh Council of North America's Position." *Transplantation Direct* 6, no. 3 (March 2020): e536.

Pigden, Charles R., ed. *Hume on Is and Ought*. Houndmills, UK: Palgrave Macmillan, 2010.

Plantinga, Alvin. *Warranted Christian Belief*. New York: Oxford University Press, 2000.

Suleiman, Farid. "The Philosophy of Taha Abderrahman: A Critical Study." *Die Welt des Islams* 61, no. 1 (2021): 39–71.

ʿAbd al-Raḥmān, Ṭāhā. *Suʾāl al-Akhlāq: Musāhama fī al-Naqd al-Akhlāqī li-l-Ḥadātha al-Gharbiyya*. Casablanca: al-Markaz al-Thaqāfī al-ʿArabī, 2000.

———. *Tajdīd al-Manhaj fī Taqwīm al-Turāth*. Casablanca: al-Markaz al-Thaqāfī al-ʿArabī, 1994.

———. *Rūḥ al-Dīn: min Ḍīq al-ʿAlmāniyya ilā Siʿat al-Iʾtimāniyya*. Casablanca: al-Markaz al-Thaqāfī al-ʿArabī, 2012.

Vasalou, Sophia. *Moral Agents and Their Deserts: The Character of Muʿtazilite Ethics*. Princeton: Princeton University Press, 2008.

### Tertiary and Reference Works

Butlin, Patrick et al. "Consciousness in Artificial Intelligence: Insights from the Science of Consciousness." arXiv:2308.08708 (2023).

Cushman, Fiery. "Action, Outcome, and Value: A Dual-System Framework for Morality." *Personality and Social Psychology Review* 17, no. 3 (2013): 273–292.

Diyanet İşleri Başkanlığı. *İslam Ansiklopedisi*. Online edition: https://islamansiklopedisi.org.tr.

Greene, Joshua. *Moral Tribes: Emotion, Reason, and the Gap Between Us and Them*. New York: Penguin Press, 2013.

Haidt, Jonathan. *The Righteous Mind: Why Good People Are Divided by Politics and Religion*. New York: Pantheon, 2012.

Merleau-Ponty, Maurice. *Phénoménologie de la perception*. Paris: Gallimard, 1945. English translation: *Phenomenology of Perception*. Translated by Donald A. Landes. London: Routledge, 2012.

Schurz, Gerhard. *The Is-Ought Problem: An Investigation in Philosophical Logic*. Trends in Logic 1. Dordrecht: Kluwer Academic, 1997.

Taylor, Charles. *Sources of the Self: The Making of the Modern Identity*. Cambridge, MA: Harvard University Press, 1989.

Vahide, Şükran. *Islam in Modern Turkey: An Intellectual Biography of Bediuzzaman Said Nursi*. Albany, NY: SUNY Press, 2005.

---

*Manuscript draft, version 1.0. Comments and corrections welcome.*
