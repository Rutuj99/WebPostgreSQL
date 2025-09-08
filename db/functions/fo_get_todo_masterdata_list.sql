CREATE OR REPLACE FUNCTION public.fo_get_todo_masterdata_list(
    pageindex integer,
    pagesize integer,
    searchparamvalue text
)
RETURNS TABLE(todomasterlist json)
LANGUAGE plpgsql
AS $BODY$
BEGIN
    IF (pageindex IS NOT NULL AND pagesize IS NOT NULL) THEN
        pageindex := (pagesize * pageindex);
    END IF;

    IF (searchparamvalue IS NOT NULL AND (SELECT position(' ' in searchparamvalue)) > 0) THEN
        searchparamvalue := trim(regexp_replace(searchparamvalue, '\s+', '%', 'g'));
    END IF;

    RETURN QUERY
    WITH base AS (
        SELECT 
            TM."TodoId",
            COALESCE(TM."TodoTitle",'N/A') AS "TodoTitle",
            COALESCE(TM."TodoDescription",'N/A') AS "TodoDescription", 
            TM."Priority",
            COALESCE(to_char(TM."CreatedDate",'YYYY-MM-DD'),'N/A') AS "CreatedDate",
            COALESCE(TM."CreatedBy",'N/A') AS "CreatedBy",
            COALESCE(to_char(TM."UpdatedDate",'YYYY-MM-DD'),'N/A') AS "UpdatedDate",
            COALESCE(TM."UpdatedBy",'N/A') AS "UpdatedBy",
            COALESCE(TM."Status"::text, 'false') AS "Status",
            (COALESCE(TM."TodoTitle",'') || ' ' || COALESCE(TM."TodoDescription",'')) AS searchtext
        FROM public."TODO_Master" TM
        WHERE TM."Status" = B'1'
    ),
    filtered AS (
        SELECT * FROM base
        WHERE (
            searchparamvalue IS NULL 
            OR searchparamvalue = '' 
            OR base.searchtext ILIKE '%' || searchparamvalue || '%'
        )
    ),
    numbered AS (
        SELECT 
            ROW_NUMBER() OVER (ORDER BY "TodoId" DESC) AS rownumber,
            COUNT(*) OVER () AS totalresultcount,
            f.*
        FROM filtered f
    )
    SELECT COALESCE(json_agg(row_to_json(n)), '[]'::json) AS todomasterlist
    FROM (
        SELECT *
        FROM numbered
        ORDER BY "TodoId" DESC
        OFFSET pageindex LIMIT pagesize
    ) n;
END;
$BODY$;
