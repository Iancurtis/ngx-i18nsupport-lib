import {XliffFile} from '../impl/xliff-file';
import {XmbFile} from '../impl/xmb-file';
import {format} from 'util';
import {ITransUnit} from './i-trans-unit';

/**
 * The Common interface of XliffFile and XmbFile.
 * The merge process only uses this interface.
 * Created by martin on 10.03.2017.
 */
export interface ITranslationMessagesFile {

    /**
     * File format as it is used in config files.
     * Currently 'xlf', 'xlf2', 'xmb', 'xtb'
     * Returns one of the constants FORMAT_..
     */
    i18nFormat(): string;

    /**
     * File type as displayable, human readable string.
     * Currently 'XLIFF 1.2', 'XLIFF 2.0' or 'XMB' / 'XTB'
     * Returns one of the constants FILETYPE_..
     */
    fileType(): string;

    /**
     * warnings found in the file
     */
    warnings(): string[];

    /**
     * Total number of translation units found in the file.
     */
    numberOfTransUnits(): number;

    /**
     * Number of translation units without translation found in the file.
     * These units have state 'translated'.
     */
    numberOfUntranslatedTransUnits(): number;

    /**
     * Number of translation units with state 'final'.
     */
    numberOfReviewedTransUnits(): number;

    /**
     * Number of translation units without id found in the file.
     */
    numberOfTransUnitsWithMissingId(): number;

    /**
     * Get source language.
     * @return {string}
     */
    sourceLanguage(): string;

    /**
     * Get target language.
     * @return {string}
     */
    targetLanguage(): string;

    /**
     * Loop over all Translation Units.
     * @param callback
     */
    forEachTransUnit(callback: ((transunit: ITransUnit) => void));

    /**
     * Get trans-unit with given id.
     * @param id
     * @return {ITransUnit}
     */
    transUnitWithId(id: string): ITransUnit;

    /**
     * Edit functions following her
     */

    /**
     * Edit the source language.
     * @param language
     */
    setSourceLanguage(language: string);

    /**
     * Edit the target language.
     * @param language
     */
    setTargetLanguage(language: string);

    /**
     * Add a new trans-unit to this file.
     * The trans unit stems from another file.
     * It copies the source content of the tu to the target content too,
     * depending on the values of isDefaultLang and copyContent.
     * So the source can be used as a dummy translation.
     * (used by xliffmerge)
     * @param foreignTransUnit the trans unit to be imported.
     * @param isDefaultLang Flag, wether file contains the default language.
     * Then source and target are just equal.
     * The content will be copied.
     * State will be final.
     * @param copyContent Flag, wether to copy content or leave it empty.
     * Wben true, content will be copied from source.
     * When false, content will be left empty (if it is not the default language).
     * @throws an error if trans-unit with same id already is in the file.
     */
    importNewTransUnit(foreignTransUnit: ITransUnit, isDefaultLang: boolean, copyContent: boolean);

    /**
     * Remove the trans-unit with the given id.
     * @param id
     */
    removeTransUnitWithId(id: string);

    /**
     * The filename where the data is read from.
     */
    filename(): string;

    /**
     * The encoding if the xml content (UTF-8, ISO-8859-1, ...)
     */
    encoding(): string;

    /**
     * The xml content to be saved after changes are made.
     */
    editedContent(): string;

    /**
     * Create a new translation file for this file for a given language.
     * Normally, this is just a copy of the original one.
     * But for XMB the translation file has format 'XTB'.
     * @param lang Language code
     * @param filename expected filename to store file
     * @param isDefaultLang Flag, wether file contains the default language.
     * Then source and target are just equal.
     * The content will be copied.
     * State will be final.
     * @param copyContent Flag, wether to copy content or leave it empty.
     * Wben true, content will be copied from source.
     * When false, content will be left empty (if it is not the default language).
     */
    createTranslationFileForLang(lang: string, filename: string, isDefaultLang: boolean, copyContent: boolean): ITranslationMessagesFile;
}