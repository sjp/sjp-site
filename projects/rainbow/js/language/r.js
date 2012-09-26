/**
 * R language patterns
 *
 * @author Simon Potter
 * @version 1.0.9
 */
Rainbow.extend('r', [
    /**
     * Note that a valid variable name is of the form:
     * [a-zA-Z][0-9a-zA-Z\._]*
     */
    {
        'matches': {
            1: {
                'name': 'keyword.operator',
                'pattern': /\=|<\-|&lt;-/g
            },
            2: {
                'name': 'string',
                'matches': {
                    'name': 'constant.character.escape',
                    'pattern': /\\('|"){1}/g
                }
            }
        },
        'pattern': /(\(|\s|\[|\=|:)(('|")([^\\\1]|\\.)*?(\3))/gm
    },
    /*{
        'name': 'keyword',
        'pattern': /(if|else|repeat|while|for|in|next|break)/g
    },*/
    /**
     * Most of these are known via the Language Reference.
     * The built-in constant symbols are known via ?Constants.
    */
    {
        'matches': {
            1: 'constant.language'
        },
        'pattern': /\b(NULL|NA|TRUE|FALSE|T|F|NaN|Inf|NA_integer_|NA_real_|NA_complex_|NA_character_)\b/g
    },
    {
        'matches': {
            1: 'constant.symbol'
        },
        'pattern': /[^0-9a-zA-Z\._]{1}(LETTERS|letters|month\.(abb|name)|pi)/g
    },
    {
        'name': 'keyword.operator',
        'pattern': /&lt;-|<-|-|==|&lt;=|<=|&gt;>|>=|<|>|&amp;&amp;|&&|&amp;|&|!=|\|\|?|\*|\+|\^|\/|%%|%\/%|\=|%in%|%\*%|%o%|%x%|\$|:|~/g
    },
    /**
     * matches runtime function declarations
     
    {
        'matches': {
            2: 'function.call'
        },
        'pattern': /{}(\w+?)(?=\()/g
    },
    */
    {
        'matches': {
            1: 'storage',
            3: 'entity.function'
        },
        'pattern': /(\s|^)(.*)(?=\s?=\s?function\s\()/g
    },
    {
        'matches': {
            1: 'storage.function'
        },
        'pattern': /[^a-zA-Z0-9._](function)(?=\s*\()/g
    },
    {
        'matches': {
            1: 'namespace',
            2: 'keyword.operator',
            3: 'function.call'
        },
        'pattern': /([a-zA-Z][a-zA-Z0-9._]+)([:]{2,3})([a-zA-Z][a-zA-Z0-9._]*(?=\s*\())\b/g
    }
    // array category character complex double function integer list logical matrix numeric vector data.frame
]);
